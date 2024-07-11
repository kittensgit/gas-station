import { IUser } from './user';

export interface IMachine {
    _id: string;
    occupied: {
        user: IUser;
        bookedAt: Date;
        bookedUntil: Date;
    };
}
