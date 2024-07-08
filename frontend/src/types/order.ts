import { IProduct } from './product';

export interface IUserOrder {
    product: IProduct;
    quantity: number;
    totalScores: number;
    statusReady: boolean;
    orderDate: Date;
}
