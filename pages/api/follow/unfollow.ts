import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import auth from "@/helper/auth";

export default async function unfollow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send("UnAuthorized");
  }

  if (req.method !== "POST") {
    res.status(401).send("Not a POST request");
  }

  const userId = await auth(token as string);

  const { id } = req.body;

  const deleteFollowing = await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: id,
      },
    },
  });

  res.json({ message: "User unfollowed" });
}
