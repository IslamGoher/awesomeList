// application requirements
const path = require(`path`);

// @route   GET `/auth`
// @desc    render login-register.html page
// @access  public
exports.getAuth = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, `../views/login-register.html`));
};