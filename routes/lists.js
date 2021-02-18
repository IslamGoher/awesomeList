// application requirements
const express = require(`express`);
const router = express.Router();
const {loggedIn} = require(`../middlewares/isLoggedIn`);
const {getHome,
       getAllLists,
       getList,
       postList} = require(`../controllers/lists`);

// @route   GET `/`
// @desc    render index.html page
// @access  private
router.get(`/`, loggedIn, getHome);

// @route   GET `/api/v1/lists`
// @desc    get all lists that created by user
// @access  private (only user can get his own lists)
router.get(`/api/v1/lists`, loggedIn, getAllLists);

// @route   GET `/api/v1/list/:listId`
// @desc    get particular list
// @access  private (only user can get his own list)
router.get(`/api/v1/list/:listId`, loggedIn, getList);

// @route   POST `/api/v1/add-list`
// @desc    add new list
// @access  private (only user can new list)
router.post(`/api/v1/add-list`, loggedIn, postList);

module.exports = router;