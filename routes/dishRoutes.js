// authorization
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGQ4YWRkYWExMDllYzQyYjJmZTZlYSIsImlhdCI6MTc3MjAwOTY1MSwiZXhwIjoxNzcyODczNjUxfQ.RJwx8LWz8XKH943Fw9q38NYjGC9te6XMpAJBW9NXbFQ
// POST http://localhost:8000/users/login
// {
// "email":"Admingmail@gmail.com",
// "password":"1234"
// }


const express = require("express");
const router = express.Router();


const {
    createDish,
    getAllDishes,
    getOneDish,
    updateDish,
    deleteDish
} = require("../controllers/dishControllers.js");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware.js");

router.route("/").post(protectAdmin, createDish);
router.route("/all").get(getAllDishes);

router.route("/:id")
.get(getOneDish)
.put(protectAdmin, updateDish)
.delete(protectAdmin, deleteDish);

module.exports = router;
