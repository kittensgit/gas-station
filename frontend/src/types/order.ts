import { IProduct } from './product';

export interface IUserOrder {
    _id: string;
    product: IProduct;
    quantity: number;
    totalScores: number;
    statusReady: boolean;
    orderDate: Date;
}

export interface IUserOrderData {
    userId: string;
    orderId: string;
}
