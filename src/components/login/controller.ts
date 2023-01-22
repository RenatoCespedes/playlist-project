import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// npm install --save jsonwebtoken
// npm install --save-dev @types/jsonwebtoken
import jwt from 'jsonwebtoken';

const prisma= new PrismaClient();

export const generatetoken= async (req: Request, res: Response) : Promise<void> => {
    const {email, password}= req.body;

    

    let existingUser;
    try {
        /* existingUser = await prisma.user.findFirst({ //findFirst acepta varios argumentos en el where, 
            where : {
                email: email,
                password: password,
            },
        }); */

        existingUser = {email: "json",  password: "webtoken"};

        if (existingUser) {
        const token = jwt.sign({ email: existingUser.email, password: existingUser.password },
            "tokensecret",
            { expiresIn: "1h" }, (err, token) => {

                if (token) {   //const prueba=  jwt.verify(token.split(".")[1], "tokensecret");
                res.json({token:token,  
                
                })} 
                else {
                    res.json({message:"error"})
                }
            })}

    } catch (error) {
        res.json({
            message:"Usuario o contraseña incorrectos"
        })
    }    
};