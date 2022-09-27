const router  = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//create post
router.post("/",async(req,res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json("new post is created");
    } catch (error) {
        res.status(500).json(error);
    }
});
// delete
router.delete("/:id",async(req,res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username ){
      try{
        await post.delete();
        res.status(200).json("post has been deleted");
      }catch(error){
        res.status(500).json(error);
      }
    }else{
      res.status(401).json("You can delete only your post");
    }
  } catch (error) {
    res.status(404).json("No post found");
  }
});

// fetch a single user
router.get("/:id",async(req,res) => {
  try {
    const post = await Post.findById(req.params.id);
    const{password,...others} = post._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("Invalid post id");
  }
});

// Get all posts
router.get("/",async(req,res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if(username){
      posts = await Post.find({username});
    }else if(catName){
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    }else{
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log("some error here");
    res.status(500).json(error);
  }
});
// router.get()

  module.exports = router;