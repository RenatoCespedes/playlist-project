import type { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const canciones= await prisma.songs.findMany();

        res.status(200).json({
            ok:true,
            data:canciones,
        })
    } catch(error) {
        res.status(500).json({
            ok: false ,
            message: error
        })
    }
};


export const findbyid = async (req:Request, res: Response): Promise<void> => {

    try { const id_song = req.params
        const cancionbyid= await prisma.songs.findUnique({where: {
        id: id_song,
                },});

        res.status(200).json({
            ok:true,
            data:cancionbyid,
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            message: error,
        })
        
    }
}


export const creacion= async(req:Request, res: Response): Promise<void> =>{
    try {
        const {name, artist, album, year, genre, duration} = req.body;

        const nuevacancion= await prisma.songs.create({
            data:{
                name: name,
                artist: artist,
                album: album,
                year: year,
                genre: genre, 
                duration: duration,
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


