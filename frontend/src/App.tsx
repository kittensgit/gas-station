import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

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
                        <Route
                            path="/refuelHistory"
                            element={<RefuelHistory />}
                        />
                        <Route path="/laundry" element={<Laundry />} />
                        <Route path="/showers" element={<Showers />} />
                        <Route
                            path="/products/:typeFilter"
                            element={<Products />}
                        />
                        <Route path="/userOrders" element={<UserOrders />} />
                        {/* Admin Routes */}
                        <Route path="/users" element={<Users />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route
                            path="/products/catalog"
                            element={<ProductsCatalog />}
                        />
                        <Route
                            path="/showers/catalog"
                            element={<ShowersCatalog />}
                        />
                        <Route
                            path="/washMachines/catalog"
                            element={<WashMachinesCatalog />}
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
