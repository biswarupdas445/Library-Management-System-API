const db = require("../models");
const Records = db.records;
const Op = db.Sequelize.Op;

// Create and Save a new Record
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userEmail) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Record
    const records = {
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      ISBN: req.body.ISBN,
      Operation: req.body.Operation,
    };

  // Save Records in the database
  Records.create(records)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Records.",
      });
    });
};

// Retrieve all Records from the database.
exports.findAll = (req, res) => {
  //Search by User Email
  if (req.query.userEmail) {
    const userEmail = req.query.userEmail;
    var condition = userEmail
      ? { userEmail: { [Op.iLike]: `%${userEmail}%` } }
      : null;
  }

  

  Records.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Records.",
      });
    });
};

// Find a single Record with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Records.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Records with id=" + id,
      });
    });
};

// Update a Record by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Records.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Records was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Record with id=${id}. Maybe Record was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Record with id=" + id,
      });
    });
};

// Delete a Record with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Records.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Record was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Record with id=${id}. Maybe Record was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Records with id=" + id,
      });
    });
};

// Delete all Records from the database.
exports.deleteAll = (req, res) => {
  Records.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Records were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Records.",
      });
    });
};

