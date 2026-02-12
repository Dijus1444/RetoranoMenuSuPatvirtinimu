const express = require("express");
const router = express.Router();

const { createDish } = require("../controllers/dishControllers.js");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware.js");

router.route("/").post(protectAdmin, createDish);

module.exports = router;
