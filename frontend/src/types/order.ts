import { IProduct } from './product';

export interface IUserOrder {
    product: IProduct;
    _id: string;
    quantity: number;
    totalScores: number;
    statusReady: boolean;
    orderDate: Date;
}
