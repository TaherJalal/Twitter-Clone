import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.create({
    data: {
      firstName: req.body.fname,
      lastName: req.body.lname,
      emailAddress: req.body.email,
      password: req.body.password,
    },
  });

  res.json(user);
}
