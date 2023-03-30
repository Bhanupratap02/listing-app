const Post = require("../models/product");
const SubCategory = require("../models/subcategory");
const { ObjectId } = require("mongodb");

module.exports = {
  createPost: async (req, res) => {
    try {
      const {
        title,
        text,
        image,
        brand,
        price,
        attachments,
        model,
        categoryId,
        subcategoryId,
      } = req.body;

 
      const post = await new Post({
        title,
        text,
        image,
        category: categoryId,
        subcategory: subcategoryId,
        brand,
        model,
        price,
        attachments,
      });
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post created successfully",
        response: post,
      });
    } catch (error) {
      console.log("Error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getPost: async (req, res) => {
    try {
      const { postId } = req.query;
      const post = await (await Post.findById({_id : new ObjectId(postId)}).populate("category")).populate("subcategory");
      post.views = post.views + 1;
      post.save();
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, product not found",
          response: {},
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Product found", response: post });
    } catch (error) {
      console.log("error", error)
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getPosts: async (_, res) => {
    try {
      const posts = await Post.find({}).sort({ createdAt: -1 }).exec();
      return res.status(200).json({
        success: true,
        message: `${posts.length} found`,
        response: posts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { postId } = req.query;

      const {
        title,
        text,
        image,
        price,
        attachments,
        brand,
        model,
        categoryId,
        subcategoryId,
      } = req.body;
      const post = await Post.findById({ _id: new ObjectId(postId) });
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, post not found",
          response: {},
        });
      }
      if (title) {
        post.title = title;
      }
      if (text) {
        post.text = text;
      }
      if (image) {
        post.image = image;
      }

      if (price) {
        post.price = price;
      }
      if (brand) {
        post.brand = brand;
      }
      if (attachments) {
        post.attachments = attachments;
      }
      if (model) {
        post.model = model;
      }
      if (categoryId) {
        post.category = categoryId;
      }
      if (subcategoryId) {
        post.subcategory = subcategoryId;
      }
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        response: post,
      });
    } catch (error) {
      console.log("error",error)
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { postId } = req.query;

      const post = await Post.findByIdAndDelete({ _id: new ObjectId(postId) });
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, post not found",
          response: {},
        });
      }

      return res.status(200).json({
        success: true,
        messsage: "Post Deleted successfully",
        response: post,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  mostViewedPost: async (_, res) => {
    try {
      const viewedPosts = await Post.find({}).sort({ views: -1 }).limit(20);
      return res.status(200).json({
        success: true,
        message: `${viewedPosts.length}  Post found`,
        response: viewedPosts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  relatedPost: async (req, res) => {
    //most top 5 related posts similar to category , subcategory and title description
    try {
      const { postId } = req.query;
      const post = await Post.findById({ _id: new ObjectId(postId) });
      let relatedPosts = await Post.find({ category: new ObjectId(post.category) });

      return res.status(200).json({
        success: true,
        message: `${relatedPosts.length}  Post found`,
        response: relatedPosts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  filterBySubCategory: async (req, res) => {
    try {
      const { subcategoryId } = req.query;
      const posts = await Post.find({ subcategory: new ObjectId(subcategoryId) });

      return res.status(200).json({
        success: false,
        message: "Fetched successfully",
        response: posts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
