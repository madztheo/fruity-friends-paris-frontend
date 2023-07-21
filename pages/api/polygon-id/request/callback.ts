// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, resolver, loaders } from "@iden3/js-iden3-auth";
import getRawBody from "raw-body";
import { getRedisClient } from "@/utils/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const redisClient = await getRedisClient();
  try {
    // Get session ID from request
    const sessionId = req.query.sessionId;

    // get JWZ token params from the post request
    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();

    const ethURL = "https://rpc.ankr.com/polygon_mumbai";
    const contractAddress = "0x134B1BE34911E39A8397ec6289782989729807a4";
    const keyDIR = "../keys";

    const ethStateResolver = new resolver.EthStateResolver(
      ethURL,
      contractAddress
    );

    const resolvers = {
      ["polygon:mumbai"]: ethStateResolver,
    };

    // fetch authRequest from sessionID
    const authRequest = await redisClient.get(`session:${sessionId}`);

    // Locate the directory that contains circuit's verification keys
    const verificationKeyloader = new loaders.FSKeyLoader(keyDIR);
    const sLoader = loaders.getDocumentLoader({
      ipfsGatewayURL: "https://ipfs.io/ipfs/",
    });

    // EXECUTE VERIFICATION
    const verifier = new (auth.Verifier as any)(
      verificationKeyloader,
      sLoader,
      resolvers
    );

    let authResponse;
    try {
      const opts = {
        AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
      };
      authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);
    } catch (error) {
      return res.status(500).send(error);
    }
    await redisClient.disconnect();
    return res
      .status(200)
      .send(
        "user with ID: " + authResponse.from + " Succesfully authenticated"
      );
  } catch (error) {
    console.error(error);
    await redisClient.disconnect();
  }
}
