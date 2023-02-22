const ProductModel = require("../Model/Product");
const userModel = require("../Model/UserModel");
const mongoose = require("mongoose");
require("../db.connection");

//Add The Data
exports.addproduct = (req, res) => {
    try {
        const Post = new ProductModel({
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_catagory: req.body.product_catagory,
            user_Id: req.body.user_Id,
        });
        Post.save()
            .then((data) => {
                return res.status(200).json({
                    message: "Product added Sucessfully !",
                    status: true,
                    data: data,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    message: "Something went wrong",
                    status: false,
                });
            });
    } catch (err) {
        res.json({ message: err });
    }
};

//Get All the Product
exports.getAllProduct = async (req, res) => {
    try {
        // const products = await ProductModel.find();
        // res.json(products);
        const products = await ProductModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_Id",
                    foreignField: "_id",
                    as: "Filter_data",
                },
            },
            {
                $unwind: {
                    path: "$filter_data",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    "Filter_data.name": 1,
                    "Filter_data.email": 1,
                    "Filter_data.mobile_number": 1,
                },
            },
        ]);
        return res.status(200).json({
            status: true,
            data: products,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            status: false,
        });
    }
};

// using post display all information using populated
exports.userInfo = async (req, res) => {
    const displayData = await ProductModel.find({ _id: req.body.pass_id }) //populate('user_Id');
        .populate({
            path: "user_Id",
            select: "name email",
        });
    res.send(displayData);
};

//get the count the data(using the group by)
/*exports.getAllProduct = async (req, res) => {
    try {
        const products = await ProductModel.aggregate([
            {
                $group: {
                    _id: '$product_name',
                    count: { $sum: 1 }
                }
            }]);
            return res.status(200).json({
                status: true,
                data: products,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Something went wrong",
                status: false,
            });
        }
        
}*/

//Api for the pagination
exports.skip_records = async (req, res) => {
    try {
        const products = await ProductModel.find().skip(1).select('product_name').limit(3);
            return res.status(200).json({
                status: true,
                data: products,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Something went wrong",
                status: false,
            });
        }
        
}