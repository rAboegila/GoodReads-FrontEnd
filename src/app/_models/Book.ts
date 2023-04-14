import { Author } from "./Author";
import { Category } from "./Category";

export interface Book {
  _id?: string;
  name: string;
  category: Category;
  author: Author;
  image?: string;
  avgRating?: number;
  reviews?: string[];
  totalRatings?: number;
  shelve?: BookShelf;
}

export enum BookShelf {
  READING = 'READING',
  READ = 'READ',
  WANT_TO_READ = 'WANT_TO_READ',
}