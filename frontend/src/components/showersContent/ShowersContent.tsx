import { FC } from 'react';

import pointsIcon from 'assets/icons/points.png';

import { IShower, IShowers } from 'types/shower';
import { IUser } from 'types/user';

import Shower from './shower/Shower';

import styles from './ShowersContent.module.css';

interface ShowersContentProps {
    userId: IUser['_id'];
    showers: Omit<IShowers, 'price'>;
    onReleaseShower: (showerId: IShower['_id']) => void;
    onBookShower: (showerId: IShower['_id']) => void;
}

const ShowersContent: FC<ShowersContentProps> = ({
    showers,
    userId,
    onReleaseShower,
    onBookShower,
}) => {
    const userShower = showers.showers.find(
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
                {showers.showers.map((item, index) => (
                    <Shower
                        userShower={userShower!}
                        key={item._id}
                        shower={item}
                        showerNum={index + 1}
                        onReleaseShower={onReleaseShower}
                        onBookShower={onBookShower}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ShowersContent;
