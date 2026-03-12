const Subscription = require("../models/Subscription");

const createSubscription = async (req, res, next) => {
    try {
        const { name, price, billingCycle } = req.body;
        const subscription = await Subscription.create({
            name,
            price,
            billingCycle,
            userId: req.user._id
        });

        res.status(201).json({
            message: "Subscription created successfully",
            subscription
        });
    } catch (error) {
        next(error);
    }
};

const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ userId: req.user._id });
        res.status(200).json({
            message: "Subscriptions fetched successfully",
            count: subscriptions.length,
            subscriptions
        });
    } catch (error) {
        next(error);
    }
};

const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found",
                details: "Either it doesn't exist or you don't have access to it"
            });
        }

        res.status(200).json({
            message: "Subscription fetched successfully",
            subscription
        });
    } catch (error) {
        next(error);
    }
};

const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found",
                details: "Either it doesn't exist or you don't have access to it"
            });
        }

        res.status(200).json({
            message: "Subscription updated successfully",
            subscription
        });
    } catch (error) {
        next(error);
    }
};

const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found",
                details: "Either it doesn't exist or you don't have access to it"
            });
        }

        res.status(200).json({
            message: "Subscription deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription
};
