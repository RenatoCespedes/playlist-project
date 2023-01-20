import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const playlists = await prisma.playlist.findMany();
  
      res.status(200).json({
        ok: true,
        data: playlists,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
};




export const createPlaylist= async(req:Request, res: Response): Promise<void> =>{
  try {
      const {id,name,userId,songs,person } = req.body;

      const nuevacancion= await prisma.playlists.create({
          data:{
            id:id,
            name:name,
            userId:userId,
            songs:songs,
            person:person
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