// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestBody } from "@/utils/polygon-id";
import { Base64 } from "js-base64";
import { User } from "@/types";
import { makeRequest } from "@/utils/api";

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
    const { id } = req.body;
    const user: User = await makeRequest(`/api/person/${id}`, "PUT", req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
