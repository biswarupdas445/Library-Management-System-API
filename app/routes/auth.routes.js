/*
module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/signin", auth.signin);
  app.use("/api/auth", router);
};
*/





const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });   

  app.post("/api/auth/signin", controller.signin);
};
