const express = require(`express`);
const router = express.Router();
const {loggedIn} = require(`../middlewares/isLoggedIn`);
const {getUserData} = require(`../controllers/user`);

// @route   GET`/api/v1/user`
// @desc    get user data
// @access  private (only user can get his own data)
router.get(`/api/v1/user`, loggedIn, getUserData);

module.exports = router;