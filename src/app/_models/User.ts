import { Book, BookShelf } from "./Book";
export interface User {
    data: any;
    _id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    image?: string;
    token?: string;
    createdAt?: Date;
    books?: Library[];
};

export interface Library {
    _id: string;
    bookId: string;
    rating: number;
    shelve: BookShelf;
    book?: Book;
}
