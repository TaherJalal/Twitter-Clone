import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import auth from "../../../helper/auth";
import { object, string } from "yup";

export default async function createTweet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1];
  const userId = await auth(token);
  const { content } = req.body;

  try {
    const tweetSchema = object({
      content: string()
        .min(1)
        .max(255)
        .required("A tweet must be between 1 to 255 characters"),
    });

    const validated = tweetSchema.validate(req.body, {
      abortEarly: false,
    });

    const tweet = await prisma.tweet.create({
      data: {
        content,
        user: {
          connect: {
            id: userId as string,
          },
        },
      },
    });

    res.json(tweet);
  } catch (error) {
    console.log(error);
  }
}
