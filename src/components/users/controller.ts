
import type { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

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

    try { const {id} = req.params;
        const userid = await prisma.user.findUnique({where: {
        id: Number(id),
                },});
        console.log(userid);
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
        hash(password,10,async (error:any,hashP:string)=>
        {
            if(error){
                res.status(500).json({
                    ok:false,
                    message:"error"
                })

                return
            }
            else{
                await prisma.user.create({
                    data:{
                        name: name,
                        email: email,
                        password: hashP,
                        last_session: last_sesion,
                        date_born: date_born, 
                        
                    }
                });
                res.status(201).json({
                    ok:true, message: "Usuario creado correctamente"
                });

            }
        }    
        )
        
    
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        });    
    }
}
