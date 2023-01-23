import type { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import  Prueba from "./interface";


const prisma= new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {

    const token = _req.headers["authorization"];
    
    try {
    if(token) {

        const prueba =  jwt.verify(token.split(" ")[1], "tokensecret") as Prueba;
        const existingUser = await prisma.user.findFirst({ //findFirst acepta varios argumentos en el where, 
            where : {
                email: prueba.email,
            },
        });

        if (existingUser) {

        const canciones= await prisma.song.findMany();
        res.status(200).json({
            ok:true,
            data:canciones, 
            message: "ruta con token "})} 
            else {res.status(500).json({
                ok: false ,
                message: "error"})} }

    else {

        const canciones= await prisma.song.findMany({
            where : {
                private_song: false                //publicas; cambiar nombre al campo
            }
        });
            if (canciones) {
        res.status(200).json({
            ok:true,
            data:canciones, 
            message: "ruta sin token"})} else { res.status(500).json({message: "error"})}
        }


    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error,
        })
        
    }

    };
        
        
    

export const findbyid = async (_req:Request, res: Response): Promise<void> => {


    const token = _req.headers["authorization"];
    const {id} = _req.params;
    try {

        if (token) {

        const prueba =  jwt.verify(token.split(" ")[1], "tokensecret") as Prueba;
        
        const user = await prisma.user.findFirst({
            where: {
                email: prueba.email,
            }
        });

        if (user) {

            const cancionbyid = await prisma.song.findUnique({
                where: {
                    id: Number(id),
                    },});
                
                    res.status(200).json({
                        ok:true,
                        data: cancionbyid, message: "token valido",
                    })
        } else {res.status(500).json({message: "algo va mal"})}
        
        }

        else {
            const cancionbyid = await prisma.song.findFirst({
                where: {
            id: Number(id),
                    },});

            if (cancionbyid?.private_song === false) {
                res.status(200).json({data:cancionbyid, message: "cancion publica sin token"})
            }
            else {
            res.status(400).json({message: "cancion privada / token no correcto"})}
            }


        } catch(error) {
            res.status(500).json({message: "error"})}
        };



export const creacion= async(req:Request, res: Response): Promise<void> =>{
    try {
        const {name, artist, album, year, genre, duration, private_song} = req.body;

        const nuevacancion= await prisma.song.create({
            data:{
                name: name,
                artist: artist,
                album: album,
                year: year,
                genre: genre, 
                duration: duration,
                private_song : private_song
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


