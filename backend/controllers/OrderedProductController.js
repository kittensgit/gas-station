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
            // if product exist in order
            const existingProductIndex = userOrder.products.findIndex((item) =>
                item.product.equals(productId)
            );

            if (existingProductIndex >= 0) {
                userOrder.products[existingProductIndex].quantity += +quantity;
                userOrder.products[existingProductIndex].totalScores +=
                    totalScores;
            } else {
                userOrder.products.push(newProduct);
            }

            await userOrder.save();
        } else {
            const newOrderedProduct = new OrderedProductModel({
                user: userId,
                products: [newProduct],
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

export const getAllOrders = async (_, res) => {
    try {
        const orders = await OrderedProductModel.find()
            .populate('user')
            .populate('products.product')
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

export const getOrder = async (req, res) => {
    try {
        const order = await OrderedProductModel.findById(req.params.orderId)
            .populate('user')
            .populate('products.product')
            .exec();

        if (!order)
            return res.status(404).json({
                message: 'User order not found',
            });

        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get user order',
        });
    }
};
