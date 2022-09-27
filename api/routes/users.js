const router  = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//update
router.put("/:id",async(req,res) => {
    if(req.body.userId === req.params.id){
        // user can update the password.
        if(req.body.password){
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
          });
          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(500).res(error);
        }
    }else{
        res.status(401).json("You can update only your account");
    }
});
// delete
router.delete("/:id",async(req,res) => {
  if(req.body.userId === req.params.id){
      // user can update the password.
      try {
        const user = await User.findById(req.body.userId);
        try{
          await Post.deleteMany({username: user.username});
          await User.findByIdAndDelete(req.body.userId);
          res.status(200).json("user had been deleted");
        }catch(error){
          res.status(500).json(error);
        }
      } catch (error) {
        // cout<<"hello"<<endl;
        res.status(404).json("User not found");
      }
  }else{
      res.status(401).json("You can delete only your account");
  }
});

// fetch a single user
router.get("/:id",async(req,res) => {
  try {
    const user = await User.findById(req.params.id);
    const{password,...others} = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("Invalid user id");
  }
});


  module.exports = router;