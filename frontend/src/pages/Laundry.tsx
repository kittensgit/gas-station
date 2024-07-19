import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IMachine, IMachines } from 'types/machine';

import LaundryContent from 'components/laundryContent/LaundryContent';

import {
    bookMachine,
    fetchMachines,
    releaseMachine,
} from '../redux/slices/machines';

const Laundry: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAuth();

    const [isBook, setIsBook] = useState<boolean>(false);
    const [isRelease, setIsRelease] = useState<boolean>(false);
    const [machinesList, setMachinesList] = useState<Omit<IMachines, 'price'>>({
        machines: [],
    });

    useEffect(() => {
        const getMachines = async () => {
            const { payload } = await dispatch(fetchMachines());

            if (payload) {
                setMachinesList(payload);
            }
        };
        getMachines();
    }, [dispatch, isRelease, isBook]);

    const onBookMachine = async (machineId: IMachine['_id']) => {
        const { payload } = await dispatch(bookMachine(machineId));
        if (payload) {
            setIsBook(true);
        } else {
            alert('Failed to book');
        }
    };

    const onReleaseMachine = async (machineId: IMachine['_id']) => {
        const { payload } = await dispatch(releaseMachine(machineId));
        if (payload) {
            setIsRelease(true);
        }
    };
    return (
        <LaundryContent
            userId={userId}
            machines={machinesList}
            onBookMachine={onBookMachine}
            onReleaseMachine={onReleaseMachine}
        />
    );
};

export default Laundry;
