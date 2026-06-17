// server/utils/AppError.js
// Operational error class — separates expected failures (bad input, 404)
// from unexpected crashes (DB down, OOM). The global handler uses
// `isOperational` to decide whether to expose the message to the client.

class AppError extends Error {
  /**
   * @param {string} message - Human-readable error description
   * @param {number} statusCode - HTTP status code (4xx or 5xx)
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
