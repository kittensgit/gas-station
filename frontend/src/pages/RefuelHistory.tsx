import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IRefuelHistory } from 'types/fuel';

import History from 'components/history/History';

import { fetchAuthMe } from '../redux/slices/auth';

const RefuelHistory: FC = () => {
    const dispatch = useAppDispatch();
    const [refuelList, setRefuelList] = useState<IRefuelHistory[]>([]);
    useEffect(() => {
        const getRefuelHistory = async () => {
            const { payload } = await dispatch(fetchAuthMe());
            setRefuelList(payload.refuelingHistory);
        };
        getRefuelHistory();
    }, []);
    return <History refuelingHistory={refuelList} />;
};

export default RefuelHistory;
