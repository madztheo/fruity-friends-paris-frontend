// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestBody } from "@/utils/polygon-id";
import { Base64 } from "js-base64";
import { User } from "@/types";
import { makeRequest } from "@/utils/api";
import { getRandomImagePath } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | User
    | {
        error: any;
      }
  >
) {
  try {
    const { address } = req.body;
    const user: User = await makeRequest("/api/person", "POST", {
      address,
      picture: getRandomImagePath(),
    });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
