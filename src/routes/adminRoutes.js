const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/adminController");
const { verifyToken, restrictTo } = require("../middlewares/authMiddleware");

router.use(verifyToken);
router.use(restrictTo("admin"));

router.get("/users", getAllUsers);

module.exports = router;
