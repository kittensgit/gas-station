import { FC } from 'react';

import History from 'components/history/History';

import { useAuth } from 'hooks/useAuth';

const RefuelHistory: FC = () => {
    const { refuelingHistory } = useAuth();

    return <History refuelingHistory={refuelingHistory} />;
};

export default RefuelHistory;
