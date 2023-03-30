const Category = require("../models/category");
const SubCategory = require("../models/subcategory");
const { ObjectId } = require("mongodb");

module.exports = {
  //category
  getAllCategory: async (_, res) => {
    try {
      const category = await Category.find({}).sort({ createdAt: -1 }).exec();
      return res.status(200).json({
        success: true,
        message: `${category.length} Category found`,
        response: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getOneCategory: async (req, res) => {
    try {
      const category = await Category.findById({_id : req.params.id}).sort({ createdAt: -1 }).exec();
      return res.status(200).json({
        success: true,
        response: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const isExist = await Category.findOne({ categoryName: categoryName });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "Category already exist",
          response: {},
        });
      }
      const newCategory = await new Category({
        categoryName: categoryName,
      });
      await newCategory.save();
      return res.status(200).json({
        success: false,
        message: "Created successfully",
        response: newCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.query;
      const category = await Category.findByIdAndDelete({_id: new ObjectId(categoryId)});
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      await SubCategory.deleteMany({categoryId:  new ObjectId(categoryId)})
      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const {categoryId} = req.query
      const { categoryName } = req.body;
      const category = await Category.findById({ _id: new ObjectId(categoryId) });
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, category not found",
          response: {},
        });
      }
      if (categoryName) {
        category.categoryName = categoryName;
      }
      await category.save();
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  //subactegory
  getOneSubCategory: async (req, res) => {
    try {
      const subcategory = await SubCategory.findById({_id : req.params.subcategoryId}).sort({ createdAt: -1 }).exec();
      // console.log("subcategory",subcategory)
      return res.status(200).json({
        success: true,
        response: subcategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getAllSubCategory: async (_, res) => {
    console.log("here")
    try {
      const subcategory = await SubCategory.find({}).sort({ createdAt: -1 }).exec();
      
      return res.status(200).json({
        success: true,
        message: `${subcategory.length} Sub Category found`,
        response: subcategory,
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
  createSubCategory: async (req, res) => {
    try {
      const { name,parent} = req.body;
      // console.log("subcategoryName",name,parent)
      const isExist = await SubCategory.findOne({
        subcategoryName: name,
      });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "Category already exist",
          response: {},
        });
      }
      const newSubCategory = await new SubCategory({
        subcategoryName: name,
        categoryId:parent,
      });
      await newSubCategory.save();
      return res.status(200).json({
        success: true,
        message: "Created successfully",
        response: newSubCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteSubCategory: async (req, res) => {
    try {
      const { subId } = req.query;
      const subcategory = await SubCategory.findByIdAndDelete({_id: new ObjectId(subId)});
      if (!subcategory) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      return res.status(200).json({
        success: true,
        message: "SubCategory deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getSubCategoryForCategory: async (req, res) => {
    try {
      const { categoryId } = req.query;
      const subcategory = await SubCategory.find({categoryId:  new ObjectId(categoryId) });
      return res.status(200).json({
        success: true,
        message: `${subcategory.length} Sub Category found`,
        response: subcategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updateSubCategory: async (req, res) => {
    try {
      const {subId} = req.query
      const { parent, name} = req.body;
      const subcategory = await SubCategory.findById({ _id: new ObjectId(subId) });
      console.log("subcategory",subcategory)
      if (!subcategory) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, category not found",
          response: {},
        });
      }
      if (name) {
        subcategory.subcategoryName = name;
      }
      if (parent) {
        subcategory.categoryId = parent;
      }
      await subcategory.save();
      return res.status(200).json({
        success: true,
        message: "SubCategory updated successfully",
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
};
