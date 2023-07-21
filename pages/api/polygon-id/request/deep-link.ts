// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestBody } from "@/utils/polygon-id";
import { Base64 } from "js-base64";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const request = getRequestBody();
    const encoded = Base64.encode(JSON.stringify(request));
    res.status(200).json({ url: `iden3comm://?i_m=${encoded}` });
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error);
  }
}
