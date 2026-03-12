const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        billingCycle: {
            type: String,
            enum: ['monthly', 'yearly'],
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
