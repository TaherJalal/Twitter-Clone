import auth from "@/helper/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send("UnAuthorized");
  }

  if (req.method !== "GET") {
    res.status(400).send("Not a GET Request");
  }

  const userId = await auth(token as string);

  const myFollowers = await prisma.follow.findMany({
    where: { followingId: userId },
  });

  res.json(myFollowers);
}
