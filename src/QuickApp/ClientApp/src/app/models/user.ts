/* Defines the User entity */
export class IUser {
    _id: string;
    timestamp: Date;
    email: string;
    token: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    lastLogin: Date;
    isActive: boolean;
    isAdmin: boolean;
    roles: any[];
}
