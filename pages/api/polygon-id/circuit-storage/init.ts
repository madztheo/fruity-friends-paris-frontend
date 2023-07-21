// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initCircuitStorage } from "@/utils/wallet-setup";
import { ICircuitStorage } from "@0xpolygonid/js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICircuitStorage>
) {
  const result = await initCircuitStorage();
  res.status(200).json(result);
}
