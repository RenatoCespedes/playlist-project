
import type { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();



export const findAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({
            ok: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
}


export const findiduser = async (req:Request, res: Response): Promise<void> => {

    try { const id_user = req.params
        const userid = await prisma.users.findUnique({where: {
        id: id_user,
                },});

        res.status(200).json({
            ok:true,
            data:userid ,
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            message: error,
        })
        
    }
}