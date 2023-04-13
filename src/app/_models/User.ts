export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    image?: string;
    token?: string;
    books?: [];
};

export enum BookShelf {
    READING = 'READING',
    READ = 'READ',
    WANT_TO_READ = 'WANT_TO_READ',
}