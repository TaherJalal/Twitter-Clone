import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { object, string } from "yup";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = process.env.SALT || 10;
  const secret = process.env.SECRET;
  const { firstName, lastName, username, email, password, displayImage } =
    req.body;

  try {
    const userSchema = object({
      firstName: string()
        .min(3)
        .max(25)
        .required(
          "First name is required and must be from 3 to 25 characters long"
        ),
      lastName: string()
        .min(3)
        .max(25)
        .required(
          "last name is required and must be from 3 to 25 characters long"
        ),
      username: string()
        .min(3)
        .max(25)
        .required(
          "user name is required and must be from 3 to 25 characters long"
        ),
      email: string().email().required("email is required"),
      password: string()
        .min(8)
        .max(16)
        .required(
          "password is required and must be from 8 to 16 characters long"
        ),
    });
    const hashPassowrd = bcrypt.hashSync(password, 10);

    const validated = await userSchema.validate(req.body, {
      abortEarly: false,
    });

    const { id } = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashPassowrd,
        displayImage,
        // following: { create: [] },
        // followers: { create: {} },
      },
    });

    res.json({ BearerToken: jwt.sign(id, secret as string) });
  } catch (e: any) {
    res.status(401).send(e.errors);
  }
}
