// application requirements
const express = require(`express`);
const app = express();

// setting port
const port = process.env.PORT || 3000;

// luanche server
app.listen(port, () => {
  console.log(`server lintening to port ${port} ...`);
});