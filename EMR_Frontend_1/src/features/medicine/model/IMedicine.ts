import { IDisease } from "../../diseases/model/IDisease";

export type IMedicine = {
    _id: string; 
    name: string;
    manufacturer: string;    
    diseases: IDisease[];    
  }
  
  export type IMedicineDTO = {
    name: string;
    manufacturer: string;
    diseases: string[];    
  };