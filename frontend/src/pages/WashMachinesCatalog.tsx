import { FC, useEffect, useState } from 'react';

import WashMachinesContent from 'components/washMachinesContent/WashMachinesContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IMachine } from 'types/machine';

import {
    addMachine,
    deleteMachine,
    fetchMachines,
    fetchMachinesPrice,
    updateMachinesPrice,
} from '../redux/slices/machines';

const WashMachinesCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [machinesList, setMachinesList] = useState<IMachine[]>([]);
    const [machinesPrice, setMachinesPrice] = useState<number>(0);
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
        };
        getMachines();
    }, [dispatch, isAdd, isRemove]);

    useEffect(() => {
        const getMachinesPrice = async () => {
            const { payload } = await dispatch(fetchMachinesPrice());
            if (payload) {
                setMachinesPrice(payload);
            }
            setIsUpdatePrice(false);
        };
        getMachinesPrice();
    }, [dispatch, isUpdatePrice]);

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

    const onUpdateMachinesPrice = async (updatedPrice: number) => {
        const { payload } = await dispatch(updateMachinesPrice(updatedPrice));
        if (payload) {
            setIsUpdatePrice(true);
        }
    };

    return (
        <WashMachinesContent
            machines={machinesList}
            machinesPrice={machinesPrice}
            onAddMachine={onAddMachine}
            onRemoveMachine={onRemoveMachine}
            onUpdateMachinesPrice={onUpdateMachinesPrice}
        />
    );
};

export default WashMachinesCatalog;
