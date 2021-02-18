// application requirements
const asyncHandler = require(`../middlewares/asyncHandler`);
const User = require(`../models/user`);

// @route   GET`/api/v1/user`
// @desc    get user data
// @access  private (only user can get his own data)
exports.getUserData = asyncHandler(async (req, res, next) => {

  // search on user
  const currentUser = await User.findById(req.user);

  // send response
  res.status(200).json({
    success: true,
    message: `get user data successfully.`,
    data: {
      kind: `user`,
      items: [{
        name: currentUser.name,
        email: currentUser.email
      }]
    }
  });

});