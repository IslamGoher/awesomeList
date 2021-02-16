// application requirements
const path = require(`path`);
const asyncHandler = require(`../middlewares/asyncHandler`);

// @route   GET `/auth`
// @desc    render login-register.html page
// @access  public
exports.getAuth = asyncHandler(async (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, `../views/login-register.html`));
});