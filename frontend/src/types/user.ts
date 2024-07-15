import { IRefuelHistory } from './fuel';

export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    scores: number | null;
    role: string;
    refuelingHistory: IRefuelHistory[];
}

export interface IUserRoleData {
    userId: IUser['_id'];
    role: IUser['role'];
}
