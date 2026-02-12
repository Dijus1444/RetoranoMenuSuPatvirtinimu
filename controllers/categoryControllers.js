const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel.js");
 
// Create Category
// @ POST
// Route /categories
// Private admin
 
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
 
    const category = new Category({ name });
    await category.save();
 
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
  // get all categories
  // GET
  // @route /categories/all
  //Public
 
const getAllCategory = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  });
 
  // get one category
  // GET
  // @route /categories/:id
  // PRIVATE
 
  const getOneCategory = asyncHandler(async(req, res)=>{
    try{
      const category = await Category.findById(req.params.id);
      if(!category){
        return res.status(404).json({message: "category not found"});
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
 
  //Update category
  // PUT
  // @route /categories/:id
  // PRIVATE
  const updateCategory = asyncHandler(async(req, res) => {
    try {
    const { name } = req.body;
 
    const category = await Category.findById(req.params.id);
 
    if (!category){
      return res.status(404).json({message: "category not found"});
    }
 
    category.name = name || category.name;
    const updatedCategory = await category.save()
 
    res.json(updatedCategory);
  }
    catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
 
  //delete category
  // DELETE
  // @route /categories/:id
  // PRIVATE
 
  const deleteCategory = asyncHandler(async(req, res)=>{
    try{
      const category = await Category.findById(req.params.id);
 
      if (!category){
        return res.status(404).json({message: "category not found"});
      }
    await Category.findByIdAndDelete(req.params.id);
 
    res.status(200).json({id: req.params.id, message: "category deleted succesfully"})
 
    } catch (err) {
        res.status(500).json({ message: err.message });
      }
  });
 
 
module.exports = { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory };