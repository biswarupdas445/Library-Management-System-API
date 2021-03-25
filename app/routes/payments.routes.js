module.exports = (app) => {
  const Controller = require("../controllers/payments.controller.js");

  var router = require("express").Router();

  // Create a new Record
  router.post("/", Controller.create);

  // Retrieve all Records
  router.get("/", Controller.findAll);

  // Retrieve a single record with id
  router.get("/:id", Controller.findOne);

  // Update a Record with id
  router.put("/:id", Controller.update);

  // Delete a Record with id
  router.delete("/:id", Controller.delete);

  // Delete All Records a new Book
  router.delete("/", Controller.deleteAll);

  app.use("/api/payments", router);
};
