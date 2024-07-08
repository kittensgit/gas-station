import { IRefuelHistory } from './fuel';

export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    scores: number | null;
    role: string;
    refuelingHistory: IRefuelHistory[];
}
