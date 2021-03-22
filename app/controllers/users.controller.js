const db = require("../models");
const Users = db.users;
const Role = db.role;
const User_Roles =db.user_roles;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

// Create and Save a new User
exports.create = (req, res) => {


 // Validate request
 if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const users = {
    email: req.body.email,
    psw: bcrypt.hashSync(req.body.psw, 8),
    name: req.body.name,
    dept: req.body.dept
    
  };

  // Save User in the database
  Users.create(users)
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was Created successfully!" });
        });
      });
    } else {
      // user role = 2
      user.setRoles([2]).then(() => {
        res.send({ message: "User was Created successfully!" });
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    });

  
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {


    //Search by Name
    if(req.query.name)
    {
      const name = req.query.name;
      var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    }
  

  //Filter by Role
  if(req.query.role)
  {
    const role = req.query.role;
    var condition = role ? { role: { [Op.iLike]: `%${role}%` } } : null;  //Have to Check
  }
  

  Users.findAll({ 
    where: condition,
    include: [
      {
        model: Role
      }
    ]

  }).then(data => {

      const resObj = data.map(user => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            id: user.id,
            email: user.email,
            psw: user.psw,
            name: user.name,
            dept: user.dept,
            roles: user.roles.map(roles => {
              //tidy up the role data
              return Object.assign(
                {},
                {
            
                  Role_name: roles.name

                })

            })

        }) 
      
      });
      res.json(resObj)
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
      const resObj = data.map(user => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            id: user.id,
            email: user.email,
            psw: user.psw,
            name: user.name,
            dept: user.dept,
            roles: user.roles.map(roles => {
              //tidy up the role data
              return Object.assign(
                {},
                {
            
                  Role_name: roles.name

                })

          })

        }) 
      
      });
      res.json(resObj)

      //res.send(data);
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
    //const roles = req.body.roles;
/*
  Users.update(req.body, {
    where: { id: id },
    include: [
      {
        model: Role
      }
    ],
    
    
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


    //User Password Update
    if(req.body.psw)
    {
      const users = {
        psw: bcrypt.hashSync(req.body.psw, 8)
        
      };
      Users.update(users, {
        where: { id: id }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User Password was updated successfully." //Response Not Work 
          });                                                  //Single function, Single responce
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User Password with id=" + id
        });
      });



    } */
    //User Role Update
    if (req.body.roles) {
      
      Role.findAll({
        attributes: ['id'],
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(data => {
        res.send(data[0]);   })
      /*  const temp = {
          roleId: data.id
        };
        User_Roles.update(temp, {
          where: { usersId: id }
        })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User Role was updated successfully." 
            });                                                 
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User Role with id=" + id
          });
        });
  

      });   */
    }
  
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
      ['name', 'ASC']
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
