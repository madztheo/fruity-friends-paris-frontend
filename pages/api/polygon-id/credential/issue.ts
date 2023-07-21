// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createIdentity,
  createKYCAgeCredential,
  initMemoryIdentityWallet,
} from "@/utils/wallet-setup";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    console.log("=============== issue credential ===============");

    let { dataStorage, identityWallet } = await initMemoryIdentityWallet();

    const { did: userDID, credential: authBJJCredentialUser } =
      await createIdentity(identityWallet);

    console.log("=============== user did ===============");
    console.log(userDID.toString());

    const { did: issuerDID, credential: issuerAuthBJJCredential } =
      await createIdentity(identityWallet);

    const credentialRequest = createKYCAgeCredential(userDID);
    const credential = await identityWallet.issueCredential(
      issuerDID,
      credentialRequest
    );

    console.log("===============  credential ===============");
    console.log(JSON.stringify(credential));

    await dataStorage.credential.saveCredential(credential);
    res.status(200).json({});
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error });
  }
}
