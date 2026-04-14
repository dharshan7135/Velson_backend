/**
 * Error handling middleware for Express
 * Updated for PostgreSQL error codes
 */

// Not Found handler
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // PostgreSQL: invalid input syntax (e.g. non-integer id)
    if (err.code === "22P02") {
        statusCode = 400;
        message = "Invalid resource ID format";
    }

    // PostgreSQL: unique_violation (duplicate key)
    if (err.code === "23505") {
        statusCode = 400;
        const detail = err.detail || "";
        message = `Duplicate value: ${detail}`;
    }

    // PostgreSQL: not_null_violation
    if (err.code === "23502") {
        statusCode = 400;
        message = `Missing required field: ${err.column || "unknown"}`;
    }

    // PostgreSQL: foreign_key_violation
    if (err.code === "23503") {
        statusCode = 400;
        message = "Referenced record does not exist";
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

module.exports = { notFound, errorHandler };
