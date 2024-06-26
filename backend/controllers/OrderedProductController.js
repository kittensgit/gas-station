import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';
import OrderedProductModel from '../models/OrderedProduct.js';
import { validationErrors } from '../helpers.js';

export const orderProduct = async (req, res) => {
    try {
        const validationRes = validationErrors(req, res);
        if (validationRes) return;

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
            return res
                .status(400)
                .json({ message: "You don't have enough points" });
        }

        const userOrder = await OrderedProductModel.findOne({
            userId,
        });

        if (userOrder) {
            userOrder.products = [
                ...userOrder.products,
                {
                    productId,
                    quantity,
                    totalScores,
                    name: product.name,
                },
            ];

            await userOrder.save();
        } else {
            const newOrderedProduct = new OrderedProductModel({
                userId,
                products: [
                    {
                        productId,
                        quantity,
                        totalScores,
                        name: product.name,
                    },
                ],
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
