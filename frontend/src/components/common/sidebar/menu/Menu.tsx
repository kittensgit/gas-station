import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import fuelIcon from 'assets/icons/fuelSm.png';
import showerIcon from 'assets/icons/shower.png';
import productsIcon from 'assets/icons/products.png';
import laundryIcon from 'assets/icons/laundry.png';

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

const Menu: FC = () => {
    const { pathname } = useLocation();
    return (
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
        </ul>
    );
};

export default Menu;
