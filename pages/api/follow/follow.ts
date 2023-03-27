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
    res.status(401).send("Not a Post Request");
  }

  const userId = await auth(token);

  const follow = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        push: req.body.id,
      },
    },
  });

  res.json(follow);
}
