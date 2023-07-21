// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initDataStorage } from "@/utils/wallet-setup";
import { IDataStorage } from "@0xpolygonid/js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDataStorage>
) {
  const result = initDataStorage();
  res.status(200).json(result);
}
