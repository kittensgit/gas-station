import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IShower } from 'types/shower';

import ShowersContent from 'components/showersContent/ShowersContent';

import {
    bookShower,
    fetchShowers,
    releaseShower,
} from '../redux/slices/showers';

const Showers: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAuth();

    const [isBook, setIsBook] = useState<boolean>(false);
    const [isRelease, setIsRelease] = useState<boolean>(false);
    const [showerList, setShowerList] = useState<IShower[]>([]);

    useEffect(() => {
        const getShowers = async () => {
            const { payload } = await dispatch(fetchShowers());

            if (payload) {
                setShowerList(payload);
            }
        };
        getShowers();
    }, [dispatch, isRelease, isBook]);

    const onBookShower = async (showerId: IShower['_id']) => {
        const { payload } = await dispatch(bookShower(showerId));
        if (payload) {
            setIsBook(true);
        } else {
            alert('Failed to book');
        }
    };

    const onReleaseShower = async (showerId: IShower['_id']) => {
        const { payload } = await dispatch(releaseShower(showerId));
        if (payload) {
            setIsRelease(true);
        }
    };

    return (
        <ShowersContent
            showers={showerList}
            userId={userId}
            onReleaseShower={onReleaseShower}
            onBookShower={onBookShower}
        />
    );
};

export default Showers;
