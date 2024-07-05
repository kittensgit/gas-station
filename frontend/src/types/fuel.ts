export interface IRefuelHistory {
    stationName: string;
    location: string;
    litersFilled: string;
    cost: number;
    refuelDate: Date;
    fuelName: string;
    _id: string;
}

export interface IFuel {
    logo: string;
    name: string;
    price: number;
    color: string;
    scores: number;
    discount?: number;
}

export interface IOrderFuel {
    name: string;
    price: number | null;
    color: string;
    literQuantity: number | null;
    scores: number | null;
    discount?: number | null;
}

export interface IRefuelData {
    fuelName: string;
    stationName: string;
    location: string;
    litersFilled: number;
    cost: number;
    scores: number;
}
