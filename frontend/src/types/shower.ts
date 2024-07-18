import { IUser } from './user';

export interface IShower {
    _id: string;
    occupied: {
        user: IUser;
        bookedAt: Date;
        bookedUntil: Date;
    };
}

export interface IShowers {
    showers: IShower[];
    price: number;
}
