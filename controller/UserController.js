
const userModel = require("../Model/UserModel")

//Add The Data
exports.addUser = (req, res) => {
    try {
        const Post = new userModel({
            name: req.body.name,
            email: req.body.email,
            mobile_number: req.body.mobile_number,
            Status: req.body.Status,
            user_type: req.body.user_type

        })
        Post.save().then(data => {
            return res.status(200).json({
                message : "User added Sucessfully !",
                status : true,
                data : data
            });

        }).catch(err => {
            return res.status(500).json({
                message : "Something went wrong",
                status : false
            });


        });
    } catch (err) {
        res.json({ message: err });
    }
}

//Get All the Data
exports.display = async(req, res) => {
    try{
        const listData= await userModel.find()
         res.json(listData);
     }catch(err){
      res.json({message:err});
     }
}


//Get the Specific Record
exports.oneUserRecord=async(req, res,)=> {
    try{
        const post=await userModel.findById(req.params.postId);
        //res.json(post);
        if(!req.params.postId)
        {
            return res.status(400).send();
        }
        res.send(post)
       }
       catch(err){
        res.json({message:err});
       }
    }

 //Delete the Data
 exports.delete=async(req,res)=>
 {
    try{
        const removepost= await userModel.findByIdAndDelete(req.params.postId);
       // res.json(removepost);
        if(!req.params.postId)
        {
            return res.status(400).send();
        }
       // res.send(removepost);
        res.json(removepost);
        }
       catch(err){
        res.json({message:err});
       }
 }

 //  Update the Data
 exports.update=async(req,res)=>{
    try{
        const _id= req.params.postId;
        const updateData=await userModel.findByIdAndUpdate(_id,req.body);
        if(!req.params.postId){
            return res.status(400).send();
        }
         res.send(updateData);
       }
       catch(err){
        res.json({message:err});
       }
 }

 