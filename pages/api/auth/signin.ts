import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const secret = process.env.SECRET;

  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  console.log(!findUser);

  if (!findUser) {
    res.status(401).send("Wrong email");
  } else {
    const verifyUser = bcrypt.compareSync(password, findUser.password);

    if (!verifyUser) {
      res.status(401).send("Wrong Password");
    }

    res.json({ BearerToken: jwt.sign(findUser.id, secret as string) });
  }
}
