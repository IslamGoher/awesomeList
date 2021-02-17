// application requirements
const express = require(`express`);
const router = express.Router();
const {loggedIn} = require(`../middlewares/isLoggedIn`);
const {getHome} = require(`../controllers/lists`);

// @route   GET `/`
// @desc    render index.html page
// @access  private
router.get(`/`, loggedIn, getHome);

module.exports = router;