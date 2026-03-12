const express = require("express");
const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

module.exports = app;