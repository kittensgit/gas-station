import { ChangeEvent, FC, useState } from 'react';

import { IFuel, IOrderFuel } from 'types/fuel';

import AddFuel from '../addFuel/AddFuel';

import FuelItem from './fuelItem/FuelItem';

import styles from './FuelList.module.css';

const fuelList: IFuel[] = [
    {
        logo: '95',
        name: 'Gasoline AI-95',
        price: 1.22,
        color: '#82C19B',
        scores: 25,
        discount: 10,
    },
    {
        logo: 'DF',
        name: 'Diesel fuel',
        price: 1.24,
        color: '#78B1FF',
        scores: 10,
        discount: 0,
    },
    {
        logo: '92',
        name: 'Gasoline AI-92',
        price: 1.56,
        color: '#CF8DC9',
        scores: 35,
        discount: 25,
    },
    {
        logo: '98',
        name: 'Gasoline AI-98',
        price: 1.89,
        color: '#ECF583',
        scores: 88,
        discount: 0,
    },
    {
        logo: 'LG',
        name: 'Liguefied gas',
        price: 1.5,
        color: '#9B7CC2',
        scores: 23,
        discount: 0,
    },
    {
        logo: 'EF',
        name: 'Electric fuel',
        price: 1.8,
        color: '#DCE6F3',
        scores: 70,
        discount: 10,
    },
];

interface FuelListProps {
    isAuth: boolean;
    isAdmin: boolean;
    isAddFuel: boolean;
    onAddOrderFuel: (orderFuel: IOrderFuel) => void;
}

const FuelList: FC<FuelListProps> = ({
    onAddOrderFuel,
    isAuth,
    isAddFuel,
    isAdmin,
}) => {
    const [literQuantity, setLiterQuantity] = useState(1);
    const [activeFuel, setActiveFuel] = useState<string | null>(null);

    const onChangeLiterQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setLiterQuantity(parseInt(e.target.value, 10));
    };

    const toggleActiveFuelEdit = (name: string) => {
        setActiveFuel(name);
    };

    const handleAddOrderFuel = (fuel: IOrderFuel) => {
        onAddOrderFuel(fuel);
        setActiveFuel(null);
        setLiterQuantity(1);
    };

    return (
        <ul className={styles.list}>
            {isAdmin && <AddFuel />}
            {fuelList.map((item, index) => (
                <FuelItem
                    key={index}
                    fuel={item}
                    literQuantity={literQuantity}
                    isEditActive={activeFuel === item.name}
                    isAddFuel={isAddFuel}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    onChangeLiterQuantity={onChangeLiterQuantity}
                    onAddOrderFuel={handleAddOrderFuel}
                    toggleEdit={toggleActiveFuelEdit}
                />
            ))}
        </ul>
    );
};

export default FuelList;
