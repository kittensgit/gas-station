import { FC } from 'react';

import { IFuel } from 'types/fuel';

import FuelItem from './fuelItem/FuelItem';

import styles from './FuelList.module.css';

const fuelList: IFuel[] = [
    {
        logo: '95',
        name: 'Gasoline AI-95',
        price: 1.22,
        color: '#82C19B',
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

const FuelList: FC = () => {
    return (
        <div className={styles.list}>
            {fuelList.map((item) => (
                <FuelItem fuel={item} />
            ))}
        </div>
    );
};

export default FuelList;
