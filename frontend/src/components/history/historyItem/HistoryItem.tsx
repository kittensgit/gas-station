import { FC } from 'react';

import { IRefuelHistory } from 'types/fuel';
import { formatDate } from 'helpers';

import styles from './HistoryItem.module.css';

interface HistoryItemProps {
    historyInfo: IRefuelHistory;
}

const HistoryItem: FC<HistoryItemProps> = ({ historyInfo }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.line_container}>
                <div className={styles.circle + ' ' + styles.start}></div>
                <p className={styles.location}>{historyInfo.location}</p>
                <div className={styles.line}></div>
                <p className={styles.stationName}>{historyInfo.stationName}</p>
                <div className={styles.circle + ' ' + styles.end}></div>
            </div>
            <div className={styles.info}>
                <div className={styles.info_item}>
                    <h3 className={styles.fuel}>{historyInfo.fuelName}</h3>
                    <p className={styles.liters}>{historyInfo.litersFilled}L</p>
                </div>
                <div className={styles.info_item}>
                    <span className={styles.date}>
                        {formatDate(historyInfo.refuelDate)}
                    </span>
                    <b className={styles.cost}>${historyInfo.cost}</b>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;
