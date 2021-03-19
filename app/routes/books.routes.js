module.exports = app => {
    const books = require("../controllers/books.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", books.create);
  
    // Retrieve all Books
    router.get("/", books.findAll);
  
   
  
    // Retrieve a single Book with id
    router.get("/:id", books.findOne);
  
    // Update a Book with id
    router.put("/:id", books.update);
  
    // Delete a Book with id
    router.delete("/:id", books.delete);
  
    // Create a new Book
    router.delete("/", books.deleteAll);

    // Retrieve all Books order by name asc
    router.get("/name/asc", books.findAllOrderByNameAsc);


    // Retrieve all Books order by copyNo DESC
    router.get("/copyNo/desc", books.findAllOrderByCopyNoDesc);

  
    app.use('/api/books', router);
  };