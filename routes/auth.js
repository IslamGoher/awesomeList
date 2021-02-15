// application requirements
const express = require(`express`);
const router = express.Router();
const {getAuth} = require(`../controllers/auth`);

// @route   GET `/auth`
// @desc    render login-register.html page
// @access  public
router.get(`/auth`, getAuth);

module.exports = router;