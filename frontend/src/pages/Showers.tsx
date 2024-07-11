import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IShower } from 'types/shower';

import ShowersContent from 'components/showersContent/ShowersContent';

import { bookShower, fetchShowers } from '../redux/slices/showers';

const Showers: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAuth();

    const [isBook, setIsBook] = useState<boolean>(false);
    const [showerList, setShowerList] = useState<IShower[]>([]);

    useEffect(() => {
        const getShowers = async () => {
            const { payload } = await dispatch(fetchShowers());

            if (payload) {
                setShowerList(payload);
            }
        };
        getShowers();
    }, [dispatch, isBook]);

    const onBookShower = async (showerId: IShower['_id']) => {
        const { payload } = await dispatch(bookShower(showerId));
        if (payload) {
            setIsBook(true);
        }
    };

    return (
        <ShowersContent
            showers={showerList}
            userId={userId}
            onBookShower={onBookShower}
        />
    );
};

export default Showers;
