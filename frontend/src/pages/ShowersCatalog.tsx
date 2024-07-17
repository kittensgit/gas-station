import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IShower } from 'types/shower';

import ShowersCatalogContent from 'components/showersCatalogContent/ShowersCatalogContent';

import { addShower, deleteShower, fetchShowers } from '../redux/slices/showers';

const ShowersCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [showerList, setShowerList] = useState<IShower[]>([]);
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [isRemove, setIsRemove] = useState<boolean>(false);

    useEffect(() => {
        const getShowers = async () => {
            const { payload } = await dispatch(fetchShowers());
            if (payload) {
                setShowerList(payload);
            }
            setIsAdd(false);
            setIsRemove(false);
        };
        getShowers();
    }, [dispatch, isAdd, isRemove]);

    const onAddShower = async (quantity: number) => {
        const { payload } = await dispatch(addShower(quantity));
        if (payload) {
            setIsAdd(true);
        }
    };

    const onRemoveShower = async (showerId: IShower['_id']) => {
        const { payload } = await dispatch(deleteShower(showerId));
        if (payload) {
            setIsRemove(true);
        }
    };

    return (
        <ShowersCatalogContent
            showers={showerList}
            onAddShower={onAddShower}
            onRemoveShower={onRemoveShower}
        />
    );
};

export default ShowersCatalog;
