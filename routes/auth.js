// application requirements
const express = require(`express`);
const router = express.Router();
const {loggedIn, notLoggedIn} = require(`../middlewares/isLoggedIn`);
const {getAuth,
       postLogin,
       postSignup,
       deleteLogout} = require(`../controllers/auth`);

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

module.exports = router;