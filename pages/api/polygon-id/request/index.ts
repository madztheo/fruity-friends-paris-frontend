// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestBody } from "@/utils/polygon-id";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const request = getRequestBody();
    res.status(200).json(request);
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error);
  }
}
