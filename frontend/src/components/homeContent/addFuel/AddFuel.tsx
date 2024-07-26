import { ChangeEvent, FC, useState } from 'react';

import plusIcon from 'assets/icons/plus.png';
import fuelIcon from 'assets/icons/fuelSm.png';

import styles from './AddFuel.module.css';

const AddFuel: FC = () => {
    const [editFuel, setEditFuel] = useState<boolean>(false);

    const [color, setColor] = useState<string>('#80b7a9');
    const [name, setName] = useState<string>('');
    const [iconName, setIconName] = useState<string>('');
    const [pricePerLiter, setPricePerLiter] = useState<number>(1);
    const [pointsPerLiter, setPointsPerLiter] = useState<number>(1);

    const toggleEdit = () => {
        setEditFuel(!editFuel);
    };

    const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleChangeIconName = (e: ChangeEvent<HTMLInputElement>) => {
        setIconName(e.target.value);
    };
    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPricePerLiter(parseInt(e.target.value, 10));
    };
    const handleChangePoints = (e: ChangeEvent<HTMLInputElement>) => {
        setPointsPerLiter(parseInt(e.target.value, 10));
    };

    return (
        <li className={styles.add_fuel}>
            {editFuel ? (
                <div className={styles.edit}>
                    <div
                        className={styles.fuel_icon}
                        style={{ backgroundColor: color }}
                    >
                        <img src={fuelIcon} alt="fuel" />
                    </div>
                    <div className={styles.edit_info}>
                        <div className={styles.info_item}>
                            <p>Name:</p>
                            <input
                                className={styles.lg_input}
                                type="text"
                                placeholder="Gasoline AI-95"
                                value={name}
                                onChange={handleChangeName}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Icon name:</p>
                            <input
                                className={styles.sm_input}
                                type="text"
                                placeholder="95"
                                value={iconName}
                                onChange={handleChangeIconName}
                                maxLength={2}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Color icon:</p>
                            <input
                                className={styles.color_input}
                                type="color"
                                value={color}
                                onChange={handleChangeColor}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Price per liter:</p>
                            <input
                                className={styles.sm_input}
                                type="number"
                                placeholder="0"
                                value={pricePerLiter}
                                onChange={handleChangePrice}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Points per liter:</p>
                            <input
                                className={styles.sm_input}
                                type="number"
                                placeholder="0"
                                value={pointsPerLiter}
                                onChange={handleChangePoints}
                            />
                        </div>
                    </div>
                    <button className={styles.add} onClick={toggleEdit}>
                        Add
                    </button>
                </div>
            ) : (
                <button onClick={toggleEdit} className={styles.plus}>
                    <img src={plusIcon} alt="plus" />
                </button>
            )}
        </li>
    );
};

export default AddFuel;
