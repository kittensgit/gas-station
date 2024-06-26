import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';
import { validationErrors } from '../helpers.js';

export const getProducts = async (_, res) => {
    try {
        const products = await ProductModel.find();

        if (!products)
            return res.status(404).json({
                message: 'Products not found',
            });

        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get products',
        });
    }
};
export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.productId);

        if (!product)
            return res.status(404).json({
                message: 'Product not found',
            });

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get product',
        });
    }
};

export const orderProduct = async (req, res) => {
    try {
        const validationRes = validationErrors(req, res);
        if (validationRes) return;

        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const product = await ProductModel.findById(req.params.productId);

        if (!product)
            return res.status(404).json({
                message: 'Product not found',
            });

        if (user.scores >= product.scoresCount) {
            user.scores = user.scores - product.scoresCount;
            await user.save();
        } else {
            return res
                .status(400)
                .json({ message: "You don't have enough points" });
        }

        res.json({
            message: `Product ordered successfully and you spent ${product.scoresCount} points`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get product',
        });
    }
};
