import { Author } from "./Author";
import { Category } from "./Category";

export interface Book {
  _id?: string;
  name: string;
  category: Category['_id'];
  author: Author;
  image?: string;
  avgRating?: number;
  reviews?: string[];
}

export  interface BookDetiles{
  _id?: string;
  name: string;
  category: Category;
  author: Author;
  image?: string;
  avgRating?: number;
  reviews?: string[];

}