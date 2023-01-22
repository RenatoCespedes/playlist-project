import type { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import  Prueba from "./interface";


const prisma= new PrismaClient();
const user={email: "json", password:"webtoken"}

export const findAll = async (_req: Request, res: Response): Promise<void> => {

    const token = _req.headers["authorization"];
    
    try {
    if(token) {

        const prueba =  jwt.verify(token.split(" ")[1], "tokensecret") as Prueba;
        
        if (user.email == prueba.email) {

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
                published: false                //publicas; cambiar nombre al campo
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
        
        
    

export const findbyid = async (req:Request, res: Response): Promise<void> => {


    const token = req.headers["authorization"];
    const {id} = req.params;
    try {

        if (token) {

        const prueba =  jwt.verify(token.split(" ")[1], "tokensecret") as Prueba;
        
        const user = prisma.user.findFirstOrThrow ({
            where: {
                email: prueba.email,
                password: prueba.password,
            }
        });
        const cancionbyid = await prisma.song.findUnique({
            where: {
        id: Number(id),
                },});
            
                res.status(500).json({
                    ok:true,
                    data: cancionbyid, message: "token valido",
                })
            } 
        else {
            const cancionbyid = await prisma.song.findUnique({
                where: {
            id: Number(id),
                    },});
            if (cancionbyid?.published == false) {
                res.json(200).json({data:cancionbyid, message: "cancion publica sin token"})
            }
            else {
            res.status(400).json({message: "cancion privada token no correcto"})}
            }

        }catch(error) {
            res.status(500).json({message: "error"})}
        };



export const creacion= async(req:Request, res: Response): Promise<void> =>{
    try {
        const {name, artist, album, year, genre, duration, published} = req.body;

        const nuevacancion= await prisma.song.create({
            data:{
                name: name,
                artist: artist,
                album: album,
                year: year,
                genre: genre, 
                duration: duration,
                published : published
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


