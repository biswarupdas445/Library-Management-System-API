const db = require("../models");
const Books = db.books;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {


 // Validate request
 if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Books
  const books = {
    ISBN: req.body.ISBN,
    name: req.body.name,
    subject: req.body.subject,
    auther: req.body.auther,
    copyNo: req.body.copyNo
    
  };

  // Save Books in the database
  Books.create(books)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Books."
      });
    });

  
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {


    //Search by Name
    if(req.query.name)
    {
      const name = req.query.name;
      var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    }
  

  //Filter by Subject
  if(req.query.subject)
  {
    const subject = req.query.subject;
    var condition = subject ? { subject: { [Op.iLike]: `%${subject}%` } } : null;
  }
  

  Books.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Books."
      });
    });
  
};

// Find a single Books with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

  Books.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Books with id=" + id
      });
    });
  
};

// Update a Books by the id in the request
exports.update = (req, res) => {


    const id = req.params.id;

  Books.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Books was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Books with id=${id}. Maybe Books was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Books with id=" + id
      });
    });
  
};

// Delete a Books with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

  Books.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Books was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Books with id=${id}. Maybe Books was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Books with id=" + id
      });
    });
  
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {


    Books.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Books were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Books."
          });
        });
  
};



// Retrieve all Books from the database Order by name ASC.
exports.findAllOrderByNameAsc = (req, res) => {

  Books.findAll({
    order: [
      ['name', 'ASC']
    ]

  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Books Order by Name ASC."
    });
  });




}

// Retrieve all Books from the database Order by copyNo DESC.
exports.findAllOrderByCopyNoDesc = (req, res) => {

  Books.findAll({
    order: [
      ['copyNo', 'DESC']
    ]

  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Books Order by Copy No. DESC."
    });
  });


}
