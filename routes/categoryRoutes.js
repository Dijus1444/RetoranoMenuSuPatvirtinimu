const express = require("express");
const router = express.Router();
 
const { deleteCategory } = require("../controllers/categoryControllers.js");
const { updateCategory } = require("../controllers/categoryControllers.js");
const { getOneCategory } = require("../controllers/categoryControllers.js");
const { createCategory } = require("../controllers/categoryControllers.js");
const { getAllCategory } = require("../controllers/categoryControllers.js");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware.js");
 
router.route("/").post(protectAdmin, createCategory);
 
router.get("/", getAllCategory);
 
router
  .route("/:id")
  .get(protectAdmin, getOneCategory)
  .put(protectAdmin, updateCategory)
  .delete(protectAdmin, deleteCategory);
module.exports = router;