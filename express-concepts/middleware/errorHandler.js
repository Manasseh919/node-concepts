//custom error class
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError"; //set the error type to APIError
  }
}

const asyncHandler = (fn = (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
});

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //log error to stack

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  //handle mongoose validation ->
  else if (err.name === "validationError") {
    return res.status(400).json({
      status: "error",
      message: "validation error",
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "validation error",
    });
  }
};

module.exports = { APIError, asyncHandler, globalErrorHandler };
