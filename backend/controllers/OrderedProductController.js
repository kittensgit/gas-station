import cron from 'node-cron';

import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';
import OrderedProductModel from '../models/OrderedProduct.js';

export const orderProduct = async (req, res) => {
    try {
        const userId = req.userId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;

        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const product = await ProductModel.findById(productId);

        const totalScores = product.scoresCount * quantity;

        if (!product)
            return res.status(404).json({
                message: 'Product not found',
            });

        if (user.scores >= product.scoresCount) {
            user.scores = user.scores - totalScores;
            await user.save();
        } else {
            return res.status(400).json({
                message: "You don't have enough points",
            });
        }

        const userOrder = await OrderedProductModel.findOne({
            user: userId,
        });

        const newProduct = {
            product: productId,
            quantity,
            totalScores,
        };

        if (userOrder) {
            userOrder.orders.push(newProduct);

            await userOrder.save();
        } else {
            const newOrderedProduct = new OrderedProductModel({
                user: userId,
                orders: [newProduct],
            });

            await newOrderedProduct.save();
        }

        res.json({
            message: `Product ordered successfully and you spent ${totalScores} points`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get product',
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userOrder = await OrderedProductModel.findOne({
            user: req.params.userId,
        })
            .populate('orders.product')
            .exec();

        if (!userOrder)
            return res.status(404).json({
                message: 'User orders not found',
            });

        const sortedOrders = userOrder.orders.sort(
            (a, b) => b.orderDate - a.orderDate
        );

        res.json(sortedOrders);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get user orders',
        });
    }
};

export const deleteUserOrder = async (req, res) => {
    try {
        const userOrder = await OrderedProductModel.findOne({
            user: req.params.userId,
        });

        if (!userOrder)
            return res.status(404).json({
                message: 'User order not found',
            });

        userOrder.orders = userOrder.orders.filter(
            (item) => !item._id.equals(req.params.orderId)
        );
        await userOrder.save();

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to delete user order',
        });
    }
};

// admin

export const getAllOrders = async (_, res) => {
    try {
        const orders = await OrderedProductModel.find()
            .populate('user')
            .populate('orders.product')
            .exec();
        if (!orders)
            return res.status(404).json({
                message: 'Orders not found',
            });

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get all orders',
        });
    }
};

export const changeStatusReady = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orderId = req.params.orderId;
        const orderedProducts = await OrderedProductModel.findOne({
            user: userId,
        });
        if (!orderedProducts)
            return res.json({
                message: 'Order not found',
            });

        const order = orderedProducts.orders.find((item) =>
            item._id.equals(orderId)
        );

        order.statusReady = true;
        order.readyTime = new Date();
        order.endReadyTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

        orderedProducts.save();

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to change order status',
        });
    }
};

cron.schedule('* * * * * *', async () => {
    // Задача запускается каждую минуту
    try {
        const now = new Date();
        const expiredOrders = await OrderedProductModel.find({
            'orders.endReadyTime': { $lt: now },
        });

        for (const orderedProduct of expiredOrders) {
            orderedProduct.orders = orderedProduct.orders.filter(
                (order) => order.endReadyTime >= now
            );
            await orderedProduct.save();
        }
    } catch (error) {
        console.error('Failed to execute task:', error);
    }
});
