const mongoose=require('mongoose');
require("../db.connection")
const ProductSchema=  new mongoose.Schema({
    product_name:
    {
      type:String,
      required:true
    },
    product_price:
    {
      type:Number,
      required:true
    },
    product_catagory:
    {
        type:String,
        required:true
    },
    user_Id:
    {
        //type: String,
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
});
const ProductModel = new mongoose.model('products',ProductSchema);
module.exports=ProductModel;