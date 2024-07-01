import { FC } from 'react';

import FuelList from './fuelList/FuelList';
import StationInfo from './stationInfo/StationInfo';

import styles from './HomeContent.module.css';

const HomeContent: FC = () => {
    return (
        <div className={styles.wrapper}>
            <FuelList />
            <StationInfo />
        </div>
    );
};

export default HomeContent;
