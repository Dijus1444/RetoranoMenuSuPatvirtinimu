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
// get all dish
// GET
// @route /dish
const getAllDishes = asyncHandler(async (req,res)=> {
    try {
        const dishes = await Dish.find().populate("category","name")

        res.json(dishes)
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

// get ONE dish
// GET
// @route /dish/;id
const getOneDish = asyncHandler(async(req,res)=> {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
        res.status(404);
        throw new Error("Dish not found");

    }
    res.status(200).json(dish);
})

// update dish
// PUT
// @route /dish/;id
// PRIVATE admin


const updateDish = asyncHandler(async(req, res)=>{
    const dish = await Dish.findById(req.params.id);
    if(!dish) {
        res.status(404);
        throw new Error("Dish not foud");
    }
    if(!req.user) {
        res.status(401);
        throw new Error("Dish not foud");
    }
    if(dish.userID.toString() !== req.user.id && req.user.role !== "admin"){
        res.status(403);
        throw new Error("User is not allowed to reach this content");
    }

    if(dish.userID.toString() === req.user.id || req.user.role === "admin"){
        const updateDish = await Dish.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        });
        
        res.status(200).json(updateDish);
    }
    });

// delete dish
// DELETE
// @route /dish/;id
// PRIVATE admin
const deleteDish=asyncHandler(async(req,res)=>{
    const dish = await Dish.findById(req.params.id);
    if(!dish) {
        res.status(404);
        throw new Error("Dish not foud");
    }
    if(!req.user) {
        res.status(401);
        throw new Error("Dish not foud");
    }
    if(dish.userID.toString() !== req.user.id && req.user.role !== "admin"){
        res.status(403);
        throw new Error("User is not allowed to reach this content");
    }

    await Dish.findByIdAndDelete(req.params.id);

    res.status(200).json({id: req.params.id});
});

// rate/like dish
// POST
// route /dishes/:id/rate
// PRIVATE

const rateDish = asyncHandler(async(req, res) => {
        const dish = await Dish.findById(req.params.id);
    if(!dish) {
        res.status(404);
        throw new Error("Dish not foud");
    }
    
    const userId = req.user.id;

    const alreadyRated = dish.ratedBy.includes(userId);
    if (alreadyRated){
        dish.ratingCount = Math.max(0, dish.ratingCount - 1);
        dish.ratedBy = dish.ratedBy.filter(id => id.toString() !== userId);
    }else{
        dish.ratingCount += 1; // dish.ratingCount = dish.ratingCount += 1;
        dish.ratedBy.push(userId);
    }

    await dish.save();
    res.json({
        ratingCount: dish.ratingCount,
        ratedBy: dish.ratedBy,
        toggled: !alreadyRated,
    })
});




module.exports = {
    createDish, 
    getAllDishes, 
    getOneDish, 
    updateDish,
    deleteDish,
    rateDish,

};