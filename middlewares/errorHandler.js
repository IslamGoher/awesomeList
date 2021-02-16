exports.errorHandler = (err, req, res, next) => {

  // logging error to console for dev
  console.log(err);

  let error = {...err};
  error.message = err.message

  // send error response to client
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      code: error.statusCode || 500,
      message: error.message || `Server error.`
    }
  });
};