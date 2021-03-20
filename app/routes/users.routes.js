module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Users
    router.get("/", users.findAll);
  
   
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    // Delete All Users a new Book
    router.delete("/", users.deleteAll);

    // Retrieve all Users order by name asc
    router.get("/name/asc", users.findAllOrderByNameAsc);


    // Retrieve all Books order by createdAt DESC
    router.get("/reg/desc", users.findAllOrderBycreatedAtDesc);

  
    app.use('/api/users', router);
  };