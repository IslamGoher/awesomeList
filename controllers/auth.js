// application requirements
const path = require(`path`);
const bcrypt = require(`bcrypt`);
const asyncHandler = require(`../middlewares/asyncHandler`);
const {Validation} = require(`../utils/validation`);
const User = require(`../models/user`);
const ErrorResponse = require(`../utils/errorResponse.js`);
const fetch = require(`node-fetch`);
const gapi = require(`googleapis`);

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

  // check if account is third party account
  if(currentUser.thirdPartyAccount) {
    return next(new ErrorResponse(401, `there's an error ocured with email or password.`));
  }

  // check if password is matches  
  const isMatched = await bcrypt.compare(req.body.params.password, currentUser.password);

  if(!isMatched) {
    return next(new ErrorResponse(401, `there's an error ocured with email or password.`));
  }

  // create session for user
  req.session.user = currentUser._id;
  req.session.loggedIn = true;

  // send response
  res.status(200).json({
    success: `true`,
    message: `user successfully signed in.`,
    redirectURL: `/`
  });

});

// @route   POST `/api/v1/signup`
// @desc    create new user
// @access  public
exports.postSignup = asyncHandler(async (req, res, next) => {

  // validation: check if there's name, email and password
  const user = new Validation(req.body.params);

  // set required properties
  user.required(`name`, `email`, `password`);

  // validate values
  user.validator.name.minLength(5);
  user.validator.name.maxLength(30);
  user.validator.email.isEmail();
  user.validator.password.minLength(8);

  // check if email not exist
  const currentUser = await User.findOne({email: req.body.params.email});

  if(currentUser) {
    return next(new ErrorResponse(401, `this email is already exists.`));
  }

  // hash password
  const hashedPassword = await bcrypt.hash(req.body.params.password, 12);

  // create new user
  const newUser = await User.create({
    name: req.body.params.name,
    email: req.body.params.email,
    password: hashedPassword
  });

  // create session data for new user
  req.session.user = newUser._id;
  req.session.loggedIn = true;

  // send response
  res.status(201).json({
    success: `true`,
    message: `user successfully signed up.`,
    redirectURL: `/`
  });

});

// @route   DELETE `/api/v1/logout`
// @desc    logout and clear session
// @access  private
exports.deleteLogout = asyncHandler(async (req, res, next) => {

  // destroy session
  req.session.destroy(() => {

    // send response
    res.status(200).json({
      success: `true`,
      message: `user successfully logged out.`,
      redirectURL: `/auth`
    });

  });
  

});

// @route   GET `/api/v1/google-oauth`
// @desc    generate google third party auth url and redirect client to it
// @access  public
exports.getGoogleOauth = asyncHandler(async (req, res, next) => {

  // enter google client id, secret and redirect url to let google cloud identify our server as client
  const oauth2Client = new gapi.Auth.OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // determine that which data we need from google email of user by entering links like bellow
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    `https://www.googleapis.com/auth/userinfo.email`
  ];

  // generate google third party auth url
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });

  // redirect client to google third party auth url
  res.status(302).redirect(url);

});

// @route   GET `/api/v1/google-callback`
// @desc    get user data from google oauth and authenticate user
// @access  public
exports.getGoogleCallback = asyncHandler(async (req, res, next) => {

  // enter google client id, secret and redirect url to let google cloud identify our server as client
  const oauth2Client = new gapi.Auth.OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // get user access token to get user data
  const {tokens} = await oauth2Client.getToken(req.query.code);

  const api = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`;

  // fetch 'api' url to get user data
  let userData = await fetch(api);
  userData = await userData.json();

  // login

  // check existation of user email to determine the next process if login or signup
  let currentUser = await User.findOne({email: userData.email});

  if(currentUser) {

    // create session for user
    req.session.user = currentUser._id;
    req.session.loggedIn = true;

    // send response
    res.status(302).redirect(`/`);

  }
  else if(!currentUser) {

    // create new user
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      thirdPartyAccount: true
    });

    // create session for user
    req.session.user = newUser._id;
    req.session.loggedIn = true;

    // send response
    res.status(302).redirect(`/`);

  }

});