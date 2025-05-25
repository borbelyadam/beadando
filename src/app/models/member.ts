import { Item } from "./item";

export interface Member {
  _id?: string;              
  name: string;
  phone: string;
  pid: string;
  address: string;
  deleted?: boolean;         
  items: Item[]; 
}