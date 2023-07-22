// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestBody } from "@/utils/polygon-id";
import { Base64 } from "js-base64";
import { User } from "@/types";
import { makeRequest } from "@/utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | { user: User | undefined }
    | {
        error: any;
      }
  >
) {
  try {
    const { id } = req.body;
    const users: User[] = await makeRequest(`/api/person/random/${id}`, "GET");
    res.status(200).json({
      user: users && users.length > 0 ? users[0] : undefined,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
