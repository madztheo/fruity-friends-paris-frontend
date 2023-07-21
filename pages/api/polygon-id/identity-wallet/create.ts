// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createIdentity, initIdentityWallet } from "@/utils/wallet-setup";
import {
  ICredentialWallet,
  IDataStorage,
  IIdentityWallet,
  IdentityWallet,
  W3CCredential,
  core,
} from "@0xpolygonid/js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    did: core.DID;
    credential: W3CCredential;
  }>
) {
  const {
    identityWallet,
  }: {
    identityWallet: IdentityWallet;
  } = req.body;
  const result = await createIdentity(identityWallet);
  res.status(200).json(result);
}
