import { FC } from 'react';

import { IMachine } from 'types/machine';
import { IUser } from 'types/user';
import pointsIcon from 'assets/icons/points.png';

import Machine from './machine/Machine';

import styles from './LaundryContent.module.css';

interface LaundryContentProps {
    userId: IUser['_id'];
    machines: IMachine[];
    onReleaseMachine: (machineId: IMachine['_id']) => void;
    onBookMachine: (machineId: IMachine['_id']) => void;
}

const LaundryContent: FC<LaundryContentProps> = ({
    machines,
    userId,
    onBookMachine,
    onReleaseMachine,
}) => {
    const userMachine = machines.find(
        (item) => item.occupied?.user?._id === userId
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h1>Washing Machine - 1000</h1>
                <img src={pointsIcon} alt="points" />
            </div>
            <ul className={styles.machines}>
                {machines.map((item, index) => (
                    <Machine
                        key={index}
                        machine={item}
                        machineNum={index + 1}
                        userMachine={userMachine!}
                        onBookMachine={onBookMachine}
                        onReleaseMachine={onReleaseMachine}
                    />
                ))}
            </ul>
        </div>
    );
};

export default LaundryContent;
