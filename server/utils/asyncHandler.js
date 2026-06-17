// server/utils/asyncHandler.js
// Wraps async route handlers to forward rejected promises to Express's
// global error handler. Eliminates try/catch boilerplate in controllers.

/**
 * @param {Function} fn - Async Express route handler (req, res, next)
 * @returns {Function} Wrapped handler that catches and forwards errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
