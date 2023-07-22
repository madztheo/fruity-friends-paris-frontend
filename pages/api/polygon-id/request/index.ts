// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestBody } from "@/utils/polygon-id";
import { Base64 } from "js-base64";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polygon-id/sign-in`
    );
    if (response.ok) {
      res.status(200).json(await response.json());
    } else {
      res.status(400).json({ error: "Error fetching result" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error);
  }
}
