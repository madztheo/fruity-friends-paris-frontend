// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/types";
import { makeRequest } from "@/utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        user: User | undefined;
      }
    | {
        error: any;
      }
  >
) {
  try {
    const { address } = req.body;
    const users: User[] = await makeRequest("/api/person", "GET");
    res.status(200).json({
      user: users.find((x) => x.address === address),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
