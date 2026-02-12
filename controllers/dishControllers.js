const asyncHandler = require("express-async-handler");

const Category = require("../models/CategoryModel.js");
const Dish = require("../models/DishModel.js");

// create a dish
// POST
// @route /dishes
// PRIVATE admin
const createDish = asyncHandler(async(req, res) => {
    const {dishName, category, description, price, photo} = req.body;
    

    if (!dishName || !category || !description || !price || !photo){
        res.status(400);
        throw new Error("Please add a required fields");
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists){
        res.status(400);
        throw new Error("Category not found");
    }
    const dish = await Dish.create({
        userID: req.user.id,
        dishName: dishName,
        category: category,
        description: description,
        price: price,
        photo: photo,
    });
    res.status(200).json(dish);
});

module.exports = {createDish};