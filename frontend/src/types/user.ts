import { IRefuelHistory } from './fuel';

export interface IUser {
    fullName: string;
    email: string;
    scores: number | null;
    role: string;
    refuelingHistory: IRefuelHistory[];
}
