import ProductModel from '../models/Product.js';

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
