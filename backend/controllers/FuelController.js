import FuelModel from '../models/Fuel.js';

export const getFuels = async (req, res) => {
    try {
        const fuels = await FuelModel.find();

        if (!fuels)
            return res.status(404).json({
                message: 'Fuels not found',
            });

        res.json(fuels);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get fuels',
        });
    }
};

// admin

export const addFuel = async (req, res) => {
    try {
        const { name, logo, scores, price, discount, color } = req.body;
        const fuel = new FuelModel({
            name,
            logo,
            scores,
            price,
            color,
            discount,
        });
        await fuel.save();
        res.json(fuel);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to add fuel',
        });
    }
};

// export const deleteProduct = async (req, res) => {
//     try {
//         const product = await ProductModel.findByIdAndDelete(
//             req.params.productId
//         );
//         if (!product)
//             return res.status(404).json({
//                 message: 'Product not found',
//             });
//         res.json({
//             success: true,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Failed to delete product',
//         });
//     }
// };
