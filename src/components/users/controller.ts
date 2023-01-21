
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


export const adduser= async(req:Request, res: Response): Promise<void> =>{
    try {
        const {name, email, password, last_sesion, date_born} = req.body;

        await prisma.songs.create({
            data:{
                name: name,
                email: email,
                password: password,
                last_sesion: last_sesion,
                date_born: date_born, 
                
            }
        });
        res.status(201).json({
            ok:true, message: "cancion creada correctamente"
        });
    
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        });    
    }
}
