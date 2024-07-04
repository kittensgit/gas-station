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
        discount: 20,
    },
    {
        logo: 'DF',
        name: 'Diesel fuel',
        price: 1.24,
        color: '#78B1FF',
    },
    {
        logo: '92',
        name: 'Gasoline AI-92',
        price: 1.56,
        color: '#CF8DC9',
    },
    {
        logo: '98',
        name: 'Gasoline AI-98',
        price: 1.89,
        color: '#ECF583',
    },
    {
        logo: 'LG',
        name: 'Liguefied gas',
        price: 1.5,
        color: '#9B7CC2',
    },
    {
        logo: 'EF',
        name: 'Electric fuel',
        price: 1.8,
        color: '#DCE6F3',
    },
];

interface FuelListProps {
    onAddOrderFuel: (orderFuel: IOrderFuel) => void;
}

const FuelList: FC<FuelListProps> = ({ onAddOrderFuel }) => {
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
        <div className={styles.list}>
            {fuelList.map((item, index) => (
                <FuelItem
                    key={index}
                    fuel={item}
                    literQuantity={literQuantity}
                    isEditActive={activeFuel === item.name}
                    isAddFuel={isAddFuel}
                    onChangeLiterQuantity={onChangeLiterQuantity}
                    onAddOrderFuel={handleAddOrderFuel}
                    toggleEdit={toggleEdit}
                />
            ))}
        </div>
    );
};

export default FuelList;
