import auth from "@/helper/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function myFollowings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send("UnAuthorized");
  }

  if (req.method !== "POST") {
    res.status(400).send("Not a POST Request");
  }

  const userId = await auth(token as string);

  const myFollowings = await prisma.follow.findMany({
    where: { followerId: userId },
  });

  res.json(myFollowings);
}
