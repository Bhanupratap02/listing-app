const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  mostViewedPost,
  relatedPost,
  filterBySubCategory,
} = require("../controllers/product");

//CREATE POST
router.post(
  "/",

  createPost
);

//GET POST
router.get(
  "/",

  getPost
);

//GET POSTS
router.get("/allPost", getPosts);

//UPDATE POST
router.put(
  "/",

  updatePost
);

//DELETE POST
router.delete("/delete", deletePost);

//mostviewdpost
router.get("/most-viewed", mostViewedPost);

//related posts
router.get("/related-post", relatedPost);


//filter by catergory posts
router.get("/filterBySubCategory", filterBySubCategory);



module.exports = router;
