import { ChangeEvent, FC, useState } from 'react';

import { IMachine } from 'types/machine';

import machineIcon from 'assets/icons/washing_machine.png';
import addIcon from 'assets/icons/add.png';
import plusIcon from 'assets/icons/plus.png';

import Machine from './machine/Machine';

import styles from './WashMachinesContent.module.css';

interface WashMachinesCatalogProps {
    machines: IMachine[];
    onAddMachine: (quantity: number) => void;
    onRemoveMachine: (machineId: IMachine['_id']) => void;
}

const WashMachinesContent: FC<WashMachinesCatalogProps> = ({
    machines,
    onAddMachine,
    onRemoveMachine,
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

    const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleAddMachine = () => {
        onAddMachine(quantity);
        toggleEdit();
        setQuantity(1);
    };
    return (
        <div>
            <ul className={styles.machines}>
                <li className={styles.add_machine}>
                    {isEdit ? (
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
                        <button onClick={toggleEdit} className={styles.plus}>
                            <img src={plusIcon} alt="add" />
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
