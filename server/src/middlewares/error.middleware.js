class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.statusCode === 11000) {
        const message = "Duplicate field value entered";
        err = new AppError(400, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export { AppError, errorMiddleware };
