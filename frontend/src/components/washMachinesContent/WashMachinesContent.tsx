import { ChangeEvent, FC, useEffect, useState } from 'react';

import { IMachine } from 'types/machine';

import machineIcon from 'assets/icons/washing_machine.png';
import addIcon from 'assets/icons/add.png';
import plusIcon from 'assets/icons/plus.png';
import editIcon from 'assets/icons/edit.png';
import pointsIcon from 'assets/icons/points.png';

import Machine from './machine/Machine';

import styles from './WashMachinesContent.module.css';

interface WashMachinesCatalogProps {
    machines: IMachine[];
    machinesPrice: number;
    onAddMachine: (quantity: number) => void;
    onRemoveMachine: (machineId: IMachine['_id']) => void;
    onUpdateMachinesPrice: (updatedPrice: number) => void;
}

const WashMachinesContent: FC<WashMachinesCatalogProps> = ({
    machines,
    machinesPrice,
    onAddMachine,
    onRemoveMachine,
    onUpdateMachinesPrice,
}) => {
    const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
    const [isEditPrice, setIsEditPrice] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [updatedPrice, setUpdatedPrice] = useState<number>(machinesPrice);

    useEffect(() => {
        setUpdatedPrice(machinesPrice);
    }, [machinesPrice]);

    const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const onChangeUpdatedPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedPrice(parseInt(e.target.value, 10));
    };

    const toggleEditProduct = () => {
        setIsEditProduct(!isEditProduct);
    };
    const toggleEditPrice = () => {
        setIsEditPrice(!isEditPrice);
    };

    const handleAddMachine = () => {
        onAddMachine(quantity);
        toggleEditProduct();
        setQuantity(1);
    };

    const handleUpdateMachinesPrice = () => {
        if (updatedPrice) {
            onUpdateMachinesPrice(updatedPrice);
            toggleEditPrice();
        }
    };
    return (
        <div className={styles.machines_content}>
            <div className={styles.title}>
                <h1>
                    Machines price -{' '}
                    {isEditPrice ? (
                        <input
                            className={styles.price_input}
                            value={updatedPrice}
                            type="number"
                            placeholder="Price"
                            autoFocus
                            onChange={onChangeUpdatedPrice}
                        />
                    ) : (
                        <span>{machinesPrice}</span>
                    )}
                </h1>
                {isEditPrice ? (
                    <button
                        className={styles.add}
                        onClick={handleUpdateMachinesPrice}
                    >
                        <img src={addIcon} alt="add" />
                    </button>
                ) : (
                    <img src={pointsIcon} alt="points" />
                )}

                {!isEditPrice && (
                    <button
                        className={styles.edit_price}
                        onClick={toggleEditPrice}
                    >
                        <img src={editIcon} alt="edit price" />
                    </button>
                )}
            </div>
            <ul className={styles.machines}>
                <li className={styles.add_machine}>
                    {isEditProduct ? (
                        <div className={styles.edit}>
                            <img src={machineIcon} alt="shower" />
                            <div className={styles.edit_info}>
                                <p>Quantity:</p>
                                <input
                                    value={quantity}
                                    onChange={onChangeQuantity}
                                    type="number"
                                    placeholder="0"
                                />
                                <button
                                    onClick={handleAddMachine}
                                    className={styles.add}
                                >
                                    <img src={addIcon} alt="add" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={toggleEditProduct}
                            className={styles.plus}
                        >
                            <img src={plusIcon} alt="plus" />
                        </button>
                    )}
                </li>
                {machines.map((item, index) => (
                    <Machine
                        key={item._id}
                        machine={item}
                        machineNum={index + 1}
                        onRemoveMachine={onRemoveMachine}
                    />
                ))}
            </ul>
        </div>
    );
};

export default WashMachinesContent;
