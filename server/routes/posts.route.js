import express from "express";
import Post from '../models/Post.js';
import User from '../models/User.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();


// Create a new post
router.post('/create', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const authorId = req.userId;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newPost = new Post({ title, 
            content, 
            author: authorId });
          await newPost.save();


        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete("/delete/:id",auth,async (req,res)=>{
    try {
            const postid =req.params.id;
      const post = await Post.findById(postid);
        if(!post){
            return res.status(404).json({"message":"post not found"})
        }
         if (post.author.toString() !== req.userId) {
            return res.status(402).json({ message: "You can't delete someone else's post" });
        }
        await Post.findByIdAndDelete(postid);
        res.json({"message":"post deleted"})
    } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });

    }
})

router.get("/all",async (req,res)=>{
    try {
       const posts =await Post.find().populate('author','username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put("/update/:id", auth, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body; // Get from body!
        
        // Find post
        const post = await Post.findById(postId);
        
        // Check if exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        // Check authorization
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ message: "You can't update someone else's post" });
        }
        
        // Update post
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true } // Return updated document
        );
        
        res.json({ message: "Post updated successfully", post: updatedPost });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
   
export default router;