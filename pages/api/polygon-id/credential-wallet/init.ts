// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initCredentialWallet, initIdentityWallet } from "@/utils/wallet-setup";
import {
  CredentialWallet,
  ICredentialWallet,
  IDataStorage,
  IIdentityWallet,
} from "@0xpolygonid/js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CredentialWallet>
) {
  const {
    dataStorage,
  }: {
    dataStorage: IDataStorage;
  } = req.body;
  const result = await initCredentialWallet(dataStorage);
  res.status(200).json(result);
}
