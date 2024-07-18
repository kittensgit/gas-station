import { FC, useEffect, useState } from 'react';

import WashMachinesContent from 'components/washMachinesContent/WashMachinesContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IMachine, IMachines } from 'types/machine';

import {
    addMachine,
    deleteMachine,
    fetchMachines,
    updateMachinePrice,
} from '../redux/slices/machines';

const WashMachinesCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [machinesList, setMachinesList] = useState<IMachines>({
        machines: [],
        price: 0,
    });
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [isRemove, setIsRemove] = useState<boolean>(false);
    const [isUpdatePrice, setIsUpdatePrice] = useState<boolean>(false);

    useEffect(() => {
        const getMachines = async () => {
            const { payload } = await dispatch(fetchMachines());
            if (payload) {
                setMachinesList(payload);
            }
            setIsAdd(false);
            setIsRemove(false);
            setIsUpdatePrice(false);
        };
        getMachines();
    }, [dispatch, isAdd, isRemove, isUpdatePrice]);

    const onAddMachine = async (quantity: number) => {
        const { payload } = await dispatch(addMachine(quantity));
        if (payload) {
            setIsAdd(true);
        }
    };

    const onRemoveMachine = async (machineId: IMachine['_id']) => {
        const { payload } = await dispatch(deleteMachine(machineId));
        if (payload) {
            setIsRemove(true);
        }
    };

    const onUpdateMachinePrice = async (updatedPrice: number) => {
        const { payload } = await dispatch(updateMachinePrice(updatedPrice));
        if (payload) {
            setIsUpdatePrice(true);
        }
    };

    return (
        <WashMachinesContent
            machines={machinesList}
            onAddMachine={onAddMachine}
            onRemoveMachine={onRemoveMachine}
            onUpdateMachinePrice={onUpdateMachinePrice}
        />
    );
};

export default WashMachinesCatalog;
