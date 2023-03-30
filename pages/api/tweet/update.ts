import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import auth from "@/helper/auth";

export default async function updateTweet(
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

  const { tweetID, content } = req.body;

  await prisma.tweet.update({
    where: {
      id: tweetID,
    },
    data: {
      content: content,
    },
  });

  res.json({ message: "Tweet Updated" });
}
