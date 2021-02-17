// application requirements
const path = require(`path`);
const bcrypt = require(`bcrypt`);
const asyncHandler = require(`../middlewares/asyncHandler`);
const Validation = require(`../utils/validation`);
const User = require(`../models/user`);
const ErrorResponse = require(`../utils/errorResponse.js`);

// @route   GET `/auth`
// @desc    render login-register.html page
// @access  public
exports.getAuth = asyncHandler(async (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, `../views/login-register.html`));
});

// @route   POST `/api/v1/auth`
// @desc    login to app
// @access  public
exports.postLogin = asyncHandler(async (req, res, next) => {
  
  // validation
  const login = new Validation(req.body.params);

  // set required properties
  login.required(`email`, `password`);

  // validate email and password
  login.validator.email.isEmail();
  login.validator.password.minLength(8);

  // check if email exists
  const currentUser = await User.findOne({email: req.body.params.email});

  if(!currentUser) {
    return next(new ErrorResponse(401, `there's an error ocured with email or password.`));
  }

  // check if password is matches  
  const isMatched = await bcrypt.compare(req.body.params.password, currentUser.password);

  if(!isMatched) {
    return next(new ErrorResponse(401, `there's an error ocured with email or password.`));
  }

  // create session for user
  req.session.user = currentUser._id;

  res.status(302).json({
    "success": "true",
    "message": "user signed in successfully." 
  });

});

// @route   POST `/api/v1/signup`
// @desc    create new user
// @access  public
exports.postSignup = asyncHandler(async (req, res, next) => {

  // validation: check if there's name, email and password
  // check if email not exist
  // create new user
  // create session data for new user

});

// @route   DELETE `/api/v1/logout`
// @desc    logout and clear session
// @access  private
exports.deleteLogout = asyncHandler(async (req, res, next) => {

  // destroy session
  // redirect user to login page

});