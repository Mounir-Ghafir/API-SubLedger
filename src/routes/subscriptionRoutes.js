const express = require("express");
const router = express.Router();
const {createSubscription,getAllSubscriptions,getSubscriptionById,updateSubscription,deleteSubscription} = require("../controllers/subscriptionController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateSubscription } = require("../middlewares/validateRequest");

router.use(verifyToken);

router.post("/", validateSubscription, createSubscription);
router.get("/", getAllSubscriptions);
router.get("/:id", getSubscriptionById);
router.put("/:id", validateSubscription, updateSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;
