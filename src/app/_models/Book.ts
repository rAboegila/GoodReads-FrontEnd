import { Author } from "./Author";
import { Category } from "./Category";

export interface Book {
  _id?: string;
  name: string;
  category: Category['_id'];
  author: Author['_id'];
  image?: string;
  avgRating?: number;
  reviews?: string[];
}
