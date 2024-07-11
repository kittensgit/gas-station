import { FC } from 'react';

import pointsIcon from 'assets/icons/points.png';

import { IShower } from 'types/shower';
import { IUser } from 'types/user';

import Shower from './shower/Shower';

import styles from './ShowersContent.module.css';

interface ShowersContentProps {
    userId: IUser['_id'];
    showers: IShower[];
    onBookShower: (showerId: IShower['_id']) => void;
}

const ShowersContent: FC<ShowersContentProps> = ({
    showers,
    userId,
    onBookShower,
}) => {
    const userShower = showers.find(
        (item) => item.occupied?.user?._id === userId
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h1>
                    Showers - <span>1200</span>
                </h1>
                <img src={pointsIcon} alt="points" />
            </div>
            <ul className={styles.showers}>
                {showers.map((item, index) => (
                    <Shower
                        userShower={userShower!}
                        key={item._id}
                        userId={userId}
                        shower={item}
                        showerNum={index + 1}
                        onBookShower={onBookShower}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ShowersContent;
