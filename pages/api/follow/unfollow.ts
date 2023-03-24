import { NextApiRequest , NextApiResponse } from "next";
import {prisma} from '../../../lib/prisma'
import auth from "@/helper/auth";

export default async function unfollow(req: NextApiRequest , res: NextApiResponse){
  const token = req.headers.authorization?.split(" ")[1];

  const userId = await auth(token)

  if(!token){
    res.status(401).send("UnAuthorized")
  }

  if(req.method !== "POST"){
    res.status(401).send("Not a POST request")
  }

  const {following} = await prisma.user.findUniqueOrThrow({
    where:{
        id : userId
    },
    include:{
        following: true
    }
  })

  const followingsAfterUnfollowingAUser = following.filter((user: string) => !following.includes(req.body.userId))

  await prisma.user.update({
    where:{
        id: userId
    },
    data:{
        following : followingsAfterUnfollowingAUser
    }
  })

  res.json({message : "User unfollowed"})

}