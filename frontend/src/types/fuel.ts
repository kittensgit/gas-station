export interface IRefuelHistory {
    stationName: string;
    location: string;
    litersFilled: string;
    cost: number;
    refuelDate: Date;
}

export interface IFuel {
    logo: string;
    name: string;
    price: number;
    color: string;
}
