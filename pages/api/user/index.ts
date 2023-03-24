import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../lib/prisma'
import auth from "@/helper/auth";

export default async function userIndex(req: NextApiRequest , res: NextApiResponse){
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(401).send("UnAuthorized")
    }

    if(req.method !== "GET"){
        res.status(401).send("Not a GET Request")
    }

    const userId = await auth(token)


    const userDeatils = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId 
        },
        include:{
            followers: true,
            following: true
        }
    }) 

    res.json(userDeatils)

}