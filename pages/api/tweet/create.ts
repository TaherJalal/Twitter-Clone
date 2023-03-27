import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import auth from "../../../helper/auth";
import { object, string } from "yup";

export default async function createTweet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send("UnAuthorized");
  }

  if (req.method !== "POST") {
    res.status(401).send("Not A POST Request");
  }

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

    await prisma.tweet.create({
      data: {
        content,
        user: {
          connect: {
            id: userId as string,
          },
        },
      },
    });

    res.send("Tweeted");
  } catch (error) {
    console.log(error);
  }
}
