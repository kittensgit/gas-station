import { FC, useEffect, useState } from 'react';

import ShowersContent from 'components/showersContent/ShowersContent';
import Loading from 'components/common/loading/Loading';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';
import { IShower } from 'types/shower';

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

    const { showers, status } = useAppSelector((state) => state.showers);

    useEffect(() => {
        const getShowers = () => {
            dispatch(fetchShowers());
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

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <div>Error</div>;
    }

    return (
        <ShowersContent
            showers={showers}
            userId={userId}
            onReleaseShower={onReleaseShower}
            onBookShower={onBookShower}
        />
    );
};

export default Showers;
