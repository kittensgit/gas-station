import { FC, useEffect, useState } from 'react';

import UsersContent from 'components/userContent/UsersContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IUser, IUserRoleData } from 'types/user';

import { fetchUsers, setUserRole } from '../redux/slices/auth';

const Users: FC = () => {
    const dispatch = useAppDispatch();

    const [isEditRole, setIsEditRole] = useState<boolean>(false);
    const [usersList, setUsersList] = useState<IUser[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const { payload } = await dispatch(fetchUsers());
            if (payload) {
                setUsersList(payload);
            }
            setIsEditRole(false);
        };
        getUsers();
    }, [dispatch, isEditRole]);

    const onSetUserRole = async (userRoleData: IUserRoleData) => {
        const { payload } = await dispatch(setUserRole(userRoleData));
        if (payload) {
            setIsEditRole(true);
        }
    };

    return <UsersContent users={usersList} onSetUserRole={onSetUserRole} />;
};

export default Users;
