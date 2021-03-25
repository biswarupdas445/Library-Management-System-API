const { authJwt } = require("../middleware");
const users = require("../controllers/users.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // const users = require("../controllers/users.controller.js");

  // var router = require("express").Router();

  // Create a new User
  app.post("/api/users", users.create);

  // Retrieve all Users
  app.get("/api/users", users.findAll);

  // Retrieve a single User with id
  app.get("/api/users/:id", users.findOne);

  // Update a User with id
  app.put("/api/users/:id", users.update);

  // Delete a User with id
  app.delete("/api/users/:id", users.delete);

  // Delete All Users
  app.delete("/api/users", users.deleteAll);

  // Retrieve all Users order by name asc
  app.get("/api/users/name/asc", users.findAllOrderByNameAsc);

  // Retrieve all Users order by createdAt DESC
  app.get("/api/users/reg/desc", users.findAllOrderBycreatedAtDesc);

  // app.use("/api/users", router);

  // For Autherization

  //Autherization for All others
  app.get("/api/test/all", users.allAccess);

  //  app.get("/api/test/student", [authJwt.verifyToken], users.studentBoard);

  //Autherization for All Students and Feculty
  app.get(
    "/api/test/StudentorFeculty",
    [authJwt.verifyToken, authJwt.isFacultyOrStudent],
    users.fecultyorstudentBoard
  );

  //Autherization for All Librarian
  app.get(
    "/api/test/Librarian",
    [authJwt.verifyToken, authJwt.isLibrarian],
    users.librarianBoard
  );
};
