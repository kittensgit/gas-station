import { FC, useEffect, useState } from 'react';

import WashMachinesContent from 'components/washMachinesContent/WashMachinesContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IMachine } from 'types/machine';

import {
    addMachine,
    deleteMachine,
    fetchMachines,
} from '../redux/slices/machines';

const WashMachinesCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [machinesList, setMachinesList] = useState<IMachine[]>([]);
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [isRemove, setIsRemove] = useState<boolean>(false);

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

    return (
        <WashMachinesContent
            machines={machinesList}
            onAddMachine={onAddMachine}
            onRemoveMachine={onRemoveMachine}
        />
    );
};

export default WashMachinesCatalog;
