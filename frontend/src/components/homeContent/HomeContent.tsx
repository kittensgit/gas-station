import { FC } from 'react';

import Sidebar from './sidebar/Sidebar';
import FuelList from './fuelList/FuelList';
import StationInfo from './stationInfo/StationInfo';

import styles from './HomeContent.module.css';

const HomeContent: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <FuelList />
            <StationInfo />
        </div>
    );
};

export default HomeContent;
