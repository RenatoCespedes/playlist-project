import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// npm install --save jsonwebtoken
// npm install --save-dev @types/jsonwebtoken
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const prisma= new PrismaClient();

export const generatetoken= async (req: Request, res: Response) : Promise<void> => {
    const {email, password}= req.body;
    try {
        const existingUser = await prisma.user.findFirst({ //findFirst acepta varios argumentos en el where, 
            where : {
                email: email,
                //password: password,
            },
        });

        if (existingUser) {
        
        bcrypt.compare(password, existingUser.password, function(err, result) {
        
            if (result) {
                const token = jwt.sign({ email: existingUser.email, password: existingUser.password },
                    "tokensecret",
                    { expiresIn: "1h" }, (err, token) => {
        
                        if (token) {  
                        res.json({token:token,  
                        
                        })} 
                        else {
                            res.json({message:"error"})}
                        }
                        )} else {res.status(500).json({message: err})}
                    })                  }

    } catch (error) {
        res.json({
            message:"Usuario o contraseña incorrectos"
        })
    }    
};


