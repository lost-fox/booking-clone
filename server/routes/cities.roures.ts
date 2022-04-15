import { Request, Response, Router } from "express";
import Cities from "../models/Cities";

const citiesRouter = Router();

citiesRouter.get("/", async (_req: Request, res: Response) => {  
   try { 
     const citiesData = await Cities.aggregate([{$sample: {size: 5}}]);
     if(!citiesData){
       res.status(404).json({message: "Cities not found"});
     }     
     res.status(200).json(citiesData);
   } catch (err:any) {
     res.status(500).json({message: err.message});
   }
  })

export default citiesRouter;
