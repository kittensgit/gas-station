import { ChangeEvent, FC, useState } from 'react';

import { IFuel, IOrderFuel } from 'types/fuel';

import FuelItem from './fuelItem/FuelItem';

import styles from './FuelList.module.css';

const fuelList: IFuel[] = [
    {
        logo: '95',
        name: 'Gasoline AI-95',
        price: 1.22,
        color: '#82C19B',
        scores: 500,
        discount: 10,
    },
    {
        logo: 'DF',
        name: 'Diesel fuel',
        price: 1.24,
        color: '#78B1FF',
        scores: 200,
    },
    {
        logo: '92',
        name: 'Gasoline AI-92',
        price: 1.56,
        color: '#CF8DC9',
        scores: 300,
        discount: 25,
    },
    {
        logo: '98',
        name: 'Gasoline AI-98',
        price: 1.89,
        color: '#ECF583',
        scores: 350,
    },
    {
        logo: 'LG',
        name: 'Liguefied gas',
        price: 1.5,
        color: '#9B7CC2',
        scores: 250,
    },
    {
        logo: 'EF',
        name: 'Electric fuel',
        price: 1.8,
        color: '#DCE6F3',
        scores: 550,
        discount: 10,
    },
];

interface FuelListProps {
    isAuth: boolean;
    onAddOrderFuel: (orderFuel: IOrderFuel) => void;
}

const FuelList: FC<FuelListProps> = ({ onAddOrderFuel, isAuth }) => {
    const [literQuantity, setLiterQuantity] = useState(1);
    const [activeFuel, setActiveFuel] = useState<string | null>(null);
    const [isAddFuel, setIsAddFuel] = useState<boolean>(false);

    const onChangeLiterQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setLiterQuantity(parseInt(e.target.value, 10));
    };

    const toggleEdit = (name: string) => {
        setActiveFuel(name);
    };

    const handleAddOrderFuel = (fuel: IOrderFuel) => {
        onAddOrderFuel(fuel);
        setActiveFuel(null);
        setIsAddFuel(true);
    };

    return (
        <ul className={styles.list}>
            {fuelList.map((item, index) => (
                <FuelItem
                    key={index}
                    fuel={item}
                    literQuantity={literQuantity}
                    isEditActive={activeFuel === item.name}
                    isAddFuel={isAddFuel}
                    isAuth={isAuth}
                    onChangeLiterQuantity={onChangeLiterQuantity}
                    onAddOrderFuel={handleAddOrderFuel}
                    toggleEdit={toggleEdit}
                />
            ))}
        </ul>
    );
};

export default FuelList;
