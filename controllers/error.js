const path = require(`path`);
const asyncHandler = require("../middlewares/asyncHandler");

// @route   GET
// @desc    render 404 page when user enter wrong url
// @access  public
exports.getError = asyncHandler((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, `../views/error.html`));
});