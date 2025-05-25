import { Member } from './member';

export interface Item {
  _id?: string;
  item_type: string;
  author: string;
  title: string;
  in_date: Date;
  status: string;
  rent_from?: Date | null;
  member?: Member | null; // már nem kell stringként kezelni
}