export interface IProduct {
    _id: string;
    name: string;
    scoresCount: number | null;
    type: 'main' | 'dessert' | 'drinks';
}
