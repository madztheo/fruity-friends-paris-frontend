// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestBody } from "@/utils/polygon-id";
import { Base64 } from "js-base64";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { user_id } = req.body;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polygon-id/sign-in/deeplink?user_id=${user_id}`
    );
    if (response.ok) {
      const encoded = Base64.encode(JSON.stringify(await response.json()));
      res.status(200).json({ url: `iden3comm://?i_m=${encoded}` });
    } else {
      res.status(400).json({ error: "Error fetching deeplink" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error);
  }
}
