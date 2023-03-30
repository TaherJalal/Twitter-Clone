import auth from "@/helper/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function deleteTweet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send("UnAuthorized");
  }

  if (req.method !== "POST") {
    res.status(401).send("Not a POST Request");
  }

  const userId = await auth(token as string);

  const { tweetId } = req.body;

  await prisma.tweet.delete({
    where: {
      id: tweetId,
    },
  });

  res.json({ message: "Tweet Deleted" });
}
