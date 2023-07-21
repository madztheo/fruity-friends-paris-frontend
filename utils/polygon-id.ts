import { getRedisClient } from "./redis";
import { auth, resolver, loaders } from "@iden3/js-iden3-auth";

export async function getRequestBody() {
  const redisClient = await getRedisClient();
  try {
    const sessionCount = await redisClient.get("sessionCount");
    const sessionId = parseInt(sessionCount ?? "0") + 1;
    // Audience is verifier id
    const hostUrl = "<NGROK_URL>";
    const callbackURL = "/api/polygon-id/request/callback";
    const audience =
      "did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs";

    const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

    // Generate request for basic authentication
    const request = auth.createAuthorizationRequest("test flow", audience, uri);

    request.id = "7f38a193-0918-4a48-9fac-36adfdb8b542";
    request.thid = "7f38a193-0918-4a48-9fac-36adfdb8b542";

    // Add request for a specific proof
    const proofRequest = {
      id: 1,
      circuitId: "credentialAtomicQuerySigV2",
      query: {
        allowedIssuers: ["*"],
        type: "ageCheck",
        context: "ipfs://QmbqiY8E1Lq6mneASQTsJSfF57TDRLcKQSi7RUomXS4HFF",
        credentialSubject: {
          birthdate: {
            $lt: 20000101,
          },
        },
      },
    };
    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];

    await redisClient.set("sessionCount", sessionId.toString());
    await redisClient.set(`session:${sessionId}`, JSON.stringify(request));
    await redisClient.disconnect();
    return request;
  } catch (error: any) {
    await redisClient.disconnect();
    throw error;
  }
}
