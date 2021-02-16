// application requirements
const express = require(`express`);
const app = express();
const path = require('path');
const dotenv = require(`dotenv`);
const morgan = require(`morgan`);
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {errorHandler} = require(`./middlewares/errorHandler`);
// load route files
const auth = require(`./routes/auth`);
const lists = require(`./routes/lists`);
const {getError} = require(`./controllers/error`);

// Add config files
const connectDB = require(`./config/db`);

// Read body of request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// using dotenv
dotenv.config({path: `./config/config.env`});

// use morgan
if(process.env.NODE_ENV === `development`) {
  app.use(morgan(`dev`));

  // auto reload frontend files -> just for development <-
  const livereload = require("livereload");
  const connectLivereload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'public'));
  liveReloadServer.watch(path.join(__dirname, 'views'));

  app.use(connectLivereload());
  
}

// Connect to mongodb
connectDB();

// Save sessions to mongodb
let store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'mySessions'
});

// Connect to session
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  store: store,
  resave: false,
  saveUninitialized: true
}));

// Access to public folder
app.use(express.static(path.join(__dirname, 'public')));

// Add routes files
app.use(auth);
app.use(lists);
app.use(getError);

// use error handler middleware
app.use(errorHandler);

// setting port
const port = process.env.PORT || 3000;

// luanche server
app.listen(port, () => {
  console.log(`listening to server in ${process.env.NODE_ENV} mode on port ${port}...`);
});