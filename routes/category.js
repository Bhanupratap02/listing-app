const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategory,
  getAllSubCategory,
  getSubCategoryForCategory,
  deleteCategory,
  deleteSubCategory,
  createSubCategory,
  updateCategory,
  updateSubCategory,
  getOneCategory,
  getOneSubCategory,
} = require("../controllers/category");

//CREATE POST
router.post("/", createCategory);
router.post("/subs", createSubCategory);
//GET categories
router.get("/", getAllCategory);
router.get("/subs", getAllSubCategory);
//GET subcategories for category
router.get("/subs/category", getSubCategoryForCategory);
router.get("/:id", getOneCategory);

//GET subcategories

router.get("/subs/:subcategoryId", getOneSubCategory);



//UPDATE category
router.put(
  "/",

  updateCategory
);

//UPDATE subcategory
router.put(
  "/subs",

  updateSubCategory
);

//DELETE category
router.delete(
  "/delete",

  deleteCategory
);

//DELETE subcategory
router.delete(
  "/subs/delete",

  deleteSubCategory
);

module.exports = router;
