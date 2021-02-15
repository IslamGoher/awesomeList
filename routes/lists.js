// application requirements
const express = require(`express`);
const router = express.Router();
const {getHome} = require(`../controllers/lists`);

// @route   GET `/`
// @desc    render index.html page
// @access  private
router.get(`/`, getHome);

module.exports = router;