import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import  Prueba from "../songs/interface";
const prisma = new PrismaClient();


export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const token = _req.headers["authorization"];
      if(token) {
        const prueba =  jwt.verify(token.split(" ")[1], "tokensecret") as Prueba;
        const existingUser = await prisma.user.findFirst({
            where : {
                email: prueba.email,
            },
        });

          if (existingUser) {
            const playlists = await prisma.playlist.findMany({
              include: { songs: true }
            });
      
            res.status(200).json({
              ok: true,
              data: playlists,
            });
          }
        }
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
};




export const createPlaylist= async(req:Request, res: Response): Promise<void> =>{
  try {
      const {name,songs,person } = req.body;
      const token = req.headers["authorization"];
      if(token) {
        const prueba =  jwt.verify(token.split(" ")[1], "tokensecret") as Prueba;
        const existingUser = await prisma.user.findFirst({
            where : {
                email: prueba.email,
            },
        });
        if (existingUser) {
          const nuevacancion= await prisma.playlist.create({
              data:{
                name:name,
                songs:songs,
                person:{ connect: { id: person } }
              }
          });
        }
    }
      res.status(201).json({
          ok:true, message: "playlist creada correctamente"
      });
  
  } catch (error) {
      res.status(500).json({
          ok:false,
          message:error
      });    
  }
}

export const add=async(req:Request, res: Response): Promise<void> =>{
  try {
      const {id_playlist,id_song}=req.body;
      const token = req.headers["authorization"];
      if(token) {
        const prueba =  jwt.verify(token.split(" ")[1], "tokensecret") as Prueba;
        const existingUser = await prisma.user.findFirst({
            where : {
                email: prueba.email,
            },
        });
        if (existingUser) {
            const dataupdate=await prisma.playlist.update({
                where:{id:id_playlist},
                data:{
                    songs:{
                        connect:{id:id_song},
                    }
                }
            })
            res.status(201).json({
              ok:true, message: "update"
          });
        }
      }
      
  } catch (error) {
      res.status(500).json({
          ok:false,
          message:error
      })
      
  }
}