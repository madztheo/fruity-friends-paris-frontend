// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  initDataStorage,
  initMemoryIdentityWallet,
} from "@/utils/wallet-setup";
import {
  CredentialWallet,
  IDataStorage,
  IIdentityWallet,
} from "@0xpolygonid/js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    dataStorage: IDataStorage;
    credentialWallet: CredentialWallet;
    identityWallet: IIdentityWallet;
  }>
) {
  const result = await initMemoryIdentityWallet();
  res.status(200).json(result);
}
