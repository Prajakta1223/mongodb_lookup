
const mongoose=require('mongoose');
require("../db.connection")
const PostSchema=  new mongoose.Schema({
    name:
    {
      type:String,
      required:true
    },
    email:
    {
        type:String,
        required:true
    },
    mobile_number:
    {
      type:Number,
      required:true
    },
    Status:
    {
        type:String,
        required:true
    },
    user_type:
    {
        type:String,
        required:true
    },
});

const PostModel = new mongoose.model('users',PostSchema);
module.exports=PostModel;