import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IShower, IShowers } from 'types/shower';

import ShowersCatalogContent from 'components/showersCatalogContent/ShowersCatalogContent';

import {
    addShower,
    deleteShower,
    fetchShowers,
    updateShowerPrice,
} from '../redux/slices/showers';

const ShowersCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [showerList, setShowerList] = useState<IShowers>({
        showers: [],
        price: 0,
    });
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [isRemove, setIsRemove] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    useEffect(() => {
        const getShowers = async () => {
            const { payload } = await dispatch(fetchShowers());
            if (payload) {
                setShowerList(payload);
            }
            setIsAdd(false);
            setIsRemove(false);
            setIsUpdate(false);
        };
        getShowers();
    }, [dispatch, isAdd, isRemove, isUpdate]);

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

    const onUpdateShowerPrice = async (showerPrice: number) => {
        const { payload } = await dispatch(updateShowerPrice(showerPrice));
        if (payload) {
            setIsUpdate(true);
        }
    };

    return (
        <ShowersCatalogContent
            showers={showerList}
            onAddShower={onAddShower}
            onRemoveShower={onRemoveShower}
            onUpdateShowerPrice={onUpdateShowerPrice}
        />
    );
};

export default ShowersCatalog;
