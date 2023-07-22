import { User } from "@/types";
import { makeRequest } from "@/utils/api";
import { getRedisClient } from "@/utils/redis";
import { NextApiRequest, NextApiResponse } from "next";

export type VerifyReply = {
  code: string;
  detail?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyReply>
) {
  const { user_id } = req.body;
  const reqBody = {
    merkle_root: req.body.merkle_root,
    nullifier_hash: req.body.nullifier_hash,
    proof: req.body.proof,
    credential_type: req.body.credential_type,
    action: "humancheck",
    signal: req.body.signal ?? "",
  };
  const response = await fetch(
    `https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_CLIENT_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }
  );
  const wldResponse = await response.json();
  if (response.status == 200) {
    // this is where you should perform backend actions based on the verified credential
    // i.e. setting a user as "verified" in a database
    await makeRequest(`/api/person/${user_id}`, "PUT", {
      isWorldcoinVerified: true,
    });
    res.status(response.status).send({ code: "success" });
  } else {
    // return the error code and detail from the World ID /verify endpoint to our frontend
    res.status(response.status).send({
      code: wldResponse.code,
      detail: wldResponse.detail,
    });
  }
}
