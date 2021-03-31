// application requirements
const express = require(`express`);
const router = express.Router();
const {loggedIn, notLoggedIn} = require(`../middlewares/isLoggedIn`);
const {getAuth,
       postLogin,
       postSignup,
       deleteLogout,
       getGoogleOauth,
       getGoogleCallback} = require(`../controllers/auth`);

// @route   GET `/auth`
// @desc    render login-register.html page
// @access  public
router.get(`/auth`, notLoggedIn, getAuth);

// @route   POST `/api/v1/auth`
// @desc    login to app
// @access  public
router.post(`/api/v1/auth`, notLoggedIn, postLogin);

// @route   POST `/api/v1/signup`
// @desc    create new user
// @access  public
router.post(`/api/v1/signup`, notLoggedIn, postSignup);

// @route   DELETE `/api/v1/logout`
// @desc    logout and clear session
// @access  private
router.delete(`/api/v1/logout`, loggedIn, deleteLogout);

// @route   GET `/api/v1/google-oauth`
// @desc    generate google third party auth url and redirect client to it
// @access  public
router.get(`/api/v1/google-oauth`, notLoggedIn, getGoogleOauth);

// @route   GET `/api/v1/google-callback`
// @desc    get user data from google oauth and authenticate user
// @access  public
router.get(`/api/v1/google-callback`, notLoggedIn, getGoogleCallback);

module.exports = router;