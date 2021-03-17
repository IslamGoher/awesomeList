// application requirement
const ErrorResponse = require(`../utils/errorResponse`);

exports.errorHandler = (err, req, res, next) => {

  // logging error to console for dev
  // console.log(err);

  let error = {...err};
  error.message = err.message

  // handle CastError
  if(err.name === `CastError`) {
    const message = `invalid id.`;
    error = new ErrorResponse(400, message);
  }

  // send error response to client
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      code: error.statusCode || 500,
      message: error.message || `Server error.`
    }
  });
};