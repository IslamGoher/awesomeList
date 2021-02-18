// application requirements
const express = require(`express`);
const router = express.Router();
const {loggedIn} = require(`../middlewares/isLoggedIn`);
const {getHome,
       getAllLists} = require(`../controllers/lists`);

// @route   GET `/`
// @desc    render index.html page
// @access  private
router.get(`/`, loggedIn, getHome);

// @route   GET `/api/v1/lists`
// @desc    get all lists that created by user
// @access  private (only user can get his own lists)
router.get(`/api/v1/lists`, loggedIn, getAllLists);

module.exports = router;