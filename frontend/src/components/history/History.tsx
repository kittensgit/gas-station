import { FC } from 'react';

import { IRefuelHistory } from 'types/fuel';

import HistoryItem from './historyItem/HistoryItem';

import styles from './History.module.css';

interface HistoryProps {
    refuelingHistory: IRefuelHistory[];
}

const History: FC<HistoryProps> = ({ refuelingHistory }) => {
    return (
        <div className={styles.wrapper}>
            {refuelingHistory.map((item) => (
                <HistoryItem key={item._id} historyInfo={item} />
            ))}
        </div>
    );
};

export default History;
