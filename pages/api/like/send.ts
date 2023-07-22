// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Like } from "@/types";
import { makeRequest } from "@/utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Like
    | {
        error: any;
      }
  >
) {
  try {
    const { from, to } = req.body;
    const like: Like = await makeRequest("/api/like", "POST", {
      from,
      to,
    });
    res.status(200).json(like);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
