module.exports = app => {
    const books = require("../controllers/books.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", books.create);
  
    // Retrieve all Books
    router.get("/", books.findAll);
  
   
  
    // Retrieve a single Tutorial with id
    router.get("/:id", books.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", books.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", books.delete);
  
    // Create a new Tutorial
    router.delete("/", books.deleteAll);
  
    app.use('/api/books', router);
  };