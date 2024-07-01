import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import fuelIcon from 'assets/icons/fuelSm.png';
import showerIcon from 'assets/icons/shower.png';
import productsIcon from 'assets/icons/products.png';
import laundryIcon from 'assets/icons/laundry.png';
import historyIcon from 'assets/icons/history.png';

import styles from './Menu.module.css';

const linkList = [
    {
        path: '',
        naming: 'Refuel',
        img: fuelIcon,
    },
    {
        path: 'products',
        naming: 'Products',
        img: productsIcon,
    },
    {
        path: 'showers',
        naming: 'Showers',
        img: showerIcon,
    },
    {
        path: 'laundry',
        naming: 'Laundry',
        img: laundryIcon,
    },
];

interface MenuProps {
    isAuth: boolean;
}

const Menu: FC<MenuProps> = ({ isAuth }) => {
    const { pathname } = useLocation();
    return (
        <div>
            <ul className={styles.list}>
                {linkList.map((item, index) => (
                    <Link key={index} to={`/${item.path}`}>
                        <li
                            className={
                                pathname === `/${item.path}`
                                    ? `${styles.link} ${styles.active}`
                                    : styles.link
                            }
                        >
                            <img src={item.img} alt={item.naming} />
                            {item.naming}
                        </li>
                    </Link>
                ))}
                {isAuth && (
                    <Link to={'/refuelHistory'}>
                        <li
                            className={
                                pathname === '/refuelHistory'
                                    ? `${styles.link} ${styles.active}`
                                    : styles.link
                            }
                        >
                            <img src={historyIcon} alt="history" />
                            Refuel history
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default Menu;
