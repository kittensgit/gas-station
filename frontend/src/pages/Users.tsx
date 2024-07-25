import { FC, useEffect } from 'react';

import UsersContent from 'components/userContent/UsersContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';
import EmptyList from 'components/common/emptyList/EmptyList';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IUserRoleData } from 'types/user';

import { fetchUsers, setUserRole } from '../redux/slices/auth';

const Users: FC = () => {
    const dispatch = useAppDispatch();

    const { users, status } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onSetUserRole = (userRoleData: IUserRoleData) => {
        dispatch(setUserRole(userRoleData));
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <Error />;
    }

    if (!users.length) {
        return <EmptyList listName="Users" />;
    }

    return <UsersContent users={users} onSetUserRole={onSetUserRole} />;
};

export default Users;
