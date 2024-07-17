import { ChangeEvent, FC, useState } from 'react';

import { IShower } from 'types/shower';

import plusIcon from 'assets/icons/plus.png';
import showerIcon from 'assets/icons/showerLg.png';
import addIcon from 'assets/icons/add.png';

import Shower from './shower/Shower';

import styles from './ShowersCatalogContent.module.css';

interface ShowersCatalogContentProps {
    showers: IShower[];
    onAddShower: (quantity: number) => void;
    onRemoveShower: (showerId: IShower['_id']) => void;
}

const ShowersCatalogContent: FC<ShowersCatalogContentProps> = ({
    showers,
    onAddShower,
    onRemoveShower,
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

    const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleAddShower = (quantity: number) => {
        if (quantity) {
            onAddShower(quantity);
            toggleEdit();
            setQuantity(1);
        } else {
            alert('Quantity will be greater than 0');
        }
    };

    return (
        <div>
            <ul className={styles.showers}>
                <li className={styles.add_shower}>
                    {isEdit ? (
                        <div className={styles.edit}>
                            <img src={showerIcon} alt="shower" />
                            <div className={styles.edit_info}>
                                <p>Quantity:</p>
                                <input
                                    value={quantity}
                                    onChange={onChangeQuantity}
                                    type="number"
                                    placeholder="0"
                                />
                                <button
                                    onClick={() => handleAddShower(quantity)}
                                    className={styles.add}
                                >
                                    <img src={addIcon} alt="add" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={toggleEdit} className={styles.plus}>
                            <img src={plusIcon} alt="add" />
                        </button>
                    )}
                </li>
                {showers.map((item, index) => (
                    <Shower
                        key={item._id}
                        shower={item}
                        showerNum={index + 1}
                        onRemoveShower={onRemoveShower}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ShowersCatalogContent;
