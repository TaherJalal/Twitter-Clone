import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

export default async function auth(token: any) {
  const userId = jwt.decode(token as string);

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  return userId;
}
