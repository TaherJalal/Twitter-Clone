import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export default async function auth(token: string) {
  const userId = jwt.verify(token, secret as string) as string;

  //   const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  return userId;
}
