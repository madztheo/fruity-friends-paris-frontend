// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initIdentityWallet } from "@/utils/wallet-setup";
import {
  ICredentialWallet,
  IDataStorage,
  IIdentityWallet,
} from "@0xpolygonid/js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IIdentityWallet>
) {
  const {
    dataStorage,
    credentialWallet,
  }: {
    dataStorage: IDataStorage;
    credentialWallet: ICredentialWallet;
  } = req.body;
  const result = await initIdentityWallet(dataStorage, credentialWallet);
  res.status(200).json(result);
}
