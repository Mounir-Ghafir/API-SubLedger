const errorHandler = (err, req, res, next) => {
    console.log("Error:", err.message);

    const statusCode = err.statusCode;
    const message = err.message;

    res.status(statusCode).json({ message: message });
};

module.exports = errorHandler;