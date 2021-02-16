// application requirements
const path = require(`path`);
const asyncHandler = require(`../middlewares/asyncHandler`);

// @route   GET `/`
// @desc    render index.html page
// @access  private
exports.getHome = asyncHandler(async (req, res, next) => {
  res.sendFile(path.join(__dirname, `../views/index.html`));
});