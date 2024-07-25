import { FC } from 'react';

import { IUser, IUserRoleData } from 'types/user';

import User from './user/User';

import styles from './UsersContent.module.css';

interface UsersContentProps {
    users: IUser[];
    onSetUserRole: (userRoleData: IUserRoleData) => void;
    onRemoveUser: (userId: IUser['_id']) => void;
}

const UsersContent: FC<UsersContentProps> = ({
    users,
    onSetUserRole,
    onRemoveUser,
}) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Scores</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        onSetUserRole={onSetUserRole}
                        onRemoveUser={onRemoveUser}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default UsersContent;
