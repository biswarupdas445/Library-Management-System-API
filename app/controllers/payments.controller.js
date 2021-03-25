const db = require("../models");
const Payments = db.payments;
const Op = db.Sequelize.Op;

// Create and Save a new Payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userEmail) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Payment
  const payments = {
    userId: req.body.userId,
    userEmail: req.body.userEmail,
    payAmt: req.body.payAmt,
    Status: req.body.Status,
  };

  // Save Payment in the database
  Payments.create(payments)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Records.",
      });
    });
};

// Retrieve all Payments from the database.
exports.findAll = (req, res) => {
  //Search by User Email
  if (req.query.userEmail) {
    const userEmail = req.query.userEmail;
    var condition = userEmail
      ? { userEmail: { [Op.iLike]: `%${userEmail}%` } }
      : null;
  }

  Payments.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Records.",
      });
    });
};

// Find a single Payment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payments.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Payments with id=" + id,
      });
    });
};

// Update a Payment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Payments.update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Payments was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Payments with id=${id}. Maybe Record was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Payments with id=" + id,
      });
    });
};

// Delete a Payments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payments.destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Payment with id=${id}. Maybe Record was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Payments with id=" + id,
      });
    });
};

// Delete all Payments from the database.
exports.deleteAll = (req, res) => {
  Payments.destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} Payments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Payments.",
      });
    });
};
