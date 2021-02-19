// application requirements
const path = require(`path`);
const asyncHandler = require(`../middlewares/asyncHandler`);
const ErrorResponse = require(`../utils/errorResponse`);
const List = require(`../models/list`);
const {Validation, Value} = require(`../utils/validation`);

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
    return next(new ErrorResponse(404, `there's no lists in this page.`));
  }

  // send response
  res.status(200).json({
    success: true,
    message: `lists data.`,
    data: {
      kind: `lists`,
      count: lists.length,
      items: lists
    }
  });

});

// @route   GET `/api/v1/list/:listId`
// @desc    get particular list
// @access  private (only user can get his own list)
exports.getList = asyncHandler(async (req, res, next) => {

  // search on list
  let list = await List.findById(req.params.listId);
  
  // check if list is exist
  if(!list) {
    return next(new ErrorResponse(404, `there's no list found with givin id.`));
  }
  
  // check if user authorized to access this list
  if(list.user.toString() !== req.user.toString()) {
    return next(new ErrorResponse(403, `you don't authorized to access this content.`));
  }

  // remove user id from list before send it to client
  list = {...list._doc}
  delete list.user;

  // send response
  res.status(200).json({
    success: true,
    message: `list data.`,
    data: {
      kind: `lists`,
      items: [list]
    }
  });

});

// @route   POST `/api/v1/add-list`
// @desc    add new list
// @access  private (only user can new list)
exports.postList = asyncHandler(async (req, res, next) => {
  
  // validation
  // validate title of list
  const validateTitle = new Value(req.body.params.title);
  validateTitle.require(`title`);
  validateTitle.maxLength(60);

  // check that user enter todos
  if(!req.body.params.todos || !req.body.params.todos[0]) {
    return next(new ErrorResponse(400, `please add at least one todo.`));
  }
  
  // validate todos
  let todos = req.body.params.todos;

  todos.forEach(element => {

    const validateTodo = new Validation(element);
    validateTodo.required(`description`, `done`);

    // validate description property
    validateTodo.validator.description.maxLength(5000);

    // validation done property
    validateTodo.validator.done.isBoolean();

  });

  // add new list
  await List.create({
    title: req.body.params.title,
    todos: req.body.params.todos,
    user: req.user
  });

  // send response
  res.status(201).json({
    success: true,
    message: `list created successfully.`
  });

});

// @route   PUT `/api/v1/list/:listId`
// @desc    update particular list
// @access  private (only user can update his own list)
exports.putList = asyncHandler(async (req, res, next) => {

  // search on list
  let list = await List.findById(req.params.listId);

  // check if list is exist
  if(!list) {
    return next(new ErrorResponse(404, `there's no list found with givin id.`));
  }

  // check if user has authorized to update this list
  if(list.user.toString() !== req.user.toString()) {
    return next(new ErrorResponse(403, `you don't authorized to access this content.`));
  }

  // validation
  // validate title of list
  const validateTitle = new Value(req.body.params.title);
  validateTitle.require(`title`);
  validateTitle.maxLength(60);

  // check that user enter todos
  if(!req.body.params.todos || !req.body.params.todos[0]) {
    return next(new ErrorResponse(400, `please add at least one todo.`));
  }
  
  // validate todos
  let todos = req.body.params.todos;

  todos.forEach(element => {

    const validateTodo = new Validation(element);
    validateTodo.required(`description`, `done`);

    // validate description property
    validateTodo.validator.description.maxLength(5000);

    // validation done property
    validateTodo.validator.done.isBoolean();

  });

  // update list
  list.title = req.body.params.title;
  list.todos = req.body.params.todos;
  await list.save();

  // send response
  res.status(200).json({
    success: true,
    message: `list updated successfully.`
  });

});

// @route   DELETE`/api/v1/list/:listId`
// @desc    delete particular list
// @access  private (only user can delete his own list)
exports.deleteList = asyncHandler(async (req, res, next) => {

  // search on list
  let list = await List.findById(req.params.listId);

  // check if list is exist
  if(!list) {
    return next(new ErrorResponse(404, `there's no list found with givin id.`));
  }

  // check if user has authorized to update this list
  if(list.user.toString() !== req.user.toString()) {
    return next(new ErrorResponse(403, `you don't authorized to access this content.`));
  }

  // delete list
  await List.remove({_id: list._id});
  
  // send response
  res.status(204);

});