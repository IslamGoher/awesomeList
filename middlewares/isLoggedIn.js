// middleware function that checking if user logged in or not

// authentication cases:
// 1 - logged in user try to access home page (or page that required auth)
// 2 - logged in user try to access login page (or page that doesn't required auth)
// 3 - not logged in user try to access home page (or page that required auth)
// 4 - not logged in user try to access login page (or page that doesn't required auth)

// for home page (for cases: 1 nad 3)
exports.loggedIn = (req, res, next) => {
  
  if(req.session.loggedIn) {

    req.user = req.session;
    next();

  } else {

    res.status(302).redirect(`/auth`);

  }
};

// for login page (for cases: 2 nad 4)
exports.notLoggedIn = (req, res, next) => {
  
  if(req.session.loggedIn) {

    res.status(302).redirect(`/`);

  } else {

    next();
    
  }
  
}