// application requirements
const path = require(`path`);

// @route   GET `/`
// @desc    render index.html page
// @access  private
exports.getHome = (req, res, next) => {
  res.sendFile(path.join(__dirname, `../views/index.html`));
};