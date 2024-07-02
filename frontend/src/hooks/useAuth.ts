import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
    const data = useAppSelector((state) => state.auth.data);

    if (data) {
        const { email, fullName, refuelingHistory, role, scores } = data;
        return {
            isAuth: true,
            email,
            fullName,
            role,
            scores,
            refuelingHistory,
        };
    } else {
        return {
            isAuth: false,
            email: '',
            fullName: '',
            role: '',
            scores: null,
            refuelingHistory: [],
        };
    }
};
