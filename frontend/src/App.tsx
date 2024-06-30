import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Laundry from 'pages/Laundry';
import Showers from 'pages/Showers';
import Products from 'pages/Products';
import Orders from 'pages/Orders';
import Order from 'pages/Order';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Profile from 'pages/Profile';

const App: FC = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/laundry" element={<Laundry />} />
                <Route path="/showers" element={<Showers />} />
                <Route path="/products" element={<Products />} />
                {/* Admin Routes */}
                <Route path="/users" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<Order />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
