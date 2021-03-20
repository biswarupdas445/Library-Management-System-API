const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {


 // Validate request
 if (!req.body.f_name || !req.body.l_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const users = {
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    role: req.body.role,
    dept: req.body.dept
    
  };

  // Save User in the database
  Users.create(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    });

  
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {


    //Search by F_Name
    if(req.query.f_name)
    {
      const name = req.query.f_name;
      var condition = f_name ? { f_name: { [Op.iLike]: `%${f_name}%` } } : null;
    }

    //Search by L_Name
    if(req.query.l_name)
    {
      const name = req.query.l_name;
      var condition = l_name ? { l_name: { [Op.iLike]: `%${l_name}%` } } : null;
    }
  

  //Filter by Role
  if(req.query.role)
  {
    const role = req.query.role;
    var condition = role ? { role: { [Op.iLike]: `%${role}%` } } : null;
  }
  

  Users.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
  
};

// Find a single User with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
  
};

// Update a User by the id in the request
exports.update = (req, res) => {


    const id = req.params.id;

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {


    Users.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Users."
          });
        });
  
};



// Retrieve all Users from the database Order by f_name ASC.
exports.findAllOrderByNameAsc = (req, res) => {

    Users.findAll({
    order: [
      ['f_name', 'ASC']
    ]

  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users Order by First Name ASC."
    });
  });




}

// Retrieve all Users from the database Order by createdAt DESC.
exports.findAllOrderBycreatedAtDesc = (req, res) => {

  Users.findAll({
    order: [
      ['createdAt', 'DESC']
    ]

  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users Order by createdAt DESC."
    });
  });


}
