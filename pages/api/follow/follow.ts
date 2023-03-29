import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import auth from "@/helper/auth";

export default async function follow(
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

  const { id } = req.body;

  const isFollowed = !!(await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: id,
      },
    },
  }));

  if (isFollowed) {
    res.status(400).send("User Is Already Followed");
  }

  const follow = await prisma.follow.create({
    data: {
      follower: { connect: { id: userId } },
      following: { connect: { id } },
    },
  });

  res.json(follow);
}
