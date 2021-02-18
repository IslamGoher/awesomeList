// application requirements
const path = require(`path`);
const asyncHandler = require(`../middlewares/asyncHandler`);
const ErrorResponse = require(`../utils/errorResponse`);
const List = require(`../models/list`);

// @route   GET `/`
// @desc    render index.html page
// @access  private
exports.getHome = asyncHandler(async (req, res, next) => {
  res.sendFile(path.join(__dirname, `../views/index.html`));
});

// @route   GET `/api/v1/lists`
// @desc    get all lists that created by user
// @access  private (only user can get his own lists)
exports.getAllLists = asyncHandler(async (req, res, next) => {

  // handling pagination
  let page = parseInt(req.query.page, 10) || 1;
  let limit = 10;
  if(page < 0) page = 1;

  // search on lists
  const lists = await List.
    find({user: req.user}).
    skip((page -1) * limit).
    limit(limit).
    select(`-user`);

  // check if user has any lists or not
  if(!lists[0]) {
    return next(new ErrorResponse(404, `there's no lists in this page`));
  }

  // send response
  res.status(200).json({
    success: true,
    message: `lists data.`,
    data: {
      kind: `lists`,
      count: lists.length,
      lists: lists
    }
  });

});