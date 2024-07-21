import { ComponentType, FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Sidebar from 'components/common/sidebar/Sidebar';

import Home from 'pages/Home';
import Laundry from 'pages/Laundry';
import Showers from 'pages/Showers';
import Products from 'pages/Products';
import Login from 'pages/Login';
import Register from 'pages/Register';
import RefuelHistory from 'pages/RefuelHistory';
import UserOrders from 'pages/UserOrders';
import Users from 'pages/Users';
import NotFound from 'pages/NotFound';
import Orders from 'pages/Orders';
import ProductsCatalog from 'pages/ProductsCatalog';
import WashMachinesCatalog from 'pages/WashMachinesCatalog';
import ShowersCatalog from 'pages/ShowersCatalog';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';

import { fetchAuthMe } from './redux/slices/auth';

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <div className="wrapper">
            <div className="container">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/laundry" element={<Laundry />} />
                        <Route path="/showers" element={<Showers />} />
                        <Route
                            path="/products/:typeFilter"
                            element={<Products />}
                        />
                        <Route
                            path="/refuelHistory"
                            element={<RefuelHistory />}
                        />
                        {/* Auth Routes */}
                        <Route
                            path="/userOrders"
                            element={<AuthRoute element={UserOrders} />}
                        />
                        {/* Admin Routes */}
                        <Route
                            path="/users"
                            element={<AdminRoute element={Users} />}
                        />
                        <Route
                            path="/orders"
                            element={<AdminRoute element={Orders} />}
                        />
                        <Route
                            path="/products/catalog"
                            element={<AdminRoute element={ProductsCatalog} />}
                        />
                        <Route
                            path="/showers/catalog"
                            element={<AdminRoute element={ShowersCatalog} />}
                        />
                        <Route
                            path="/washMachines/catalog"
                            element={
                                <AdminRoute element={WashMachinesCatalog} />
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

interface ProtectedRouteProps {
    element: ComponentType<any>;
}

const AuthRoute: FC<ProtectedRouteProps> = ({ element: Element }) => {
    const { isAuth } = useAuth();

    return isAuth ? <Element /> : <Navigate to="/login" />;
};

const AdminRoute: FC<ProtectedRouteProps> = ({ element: Element }) => {
    const { role } = useAuth();

    return role === 'admin' ? <Element /> : <Navigate to="/" />;
};

export default App;
