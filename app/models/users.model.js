module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {


      email: {
        type: Sequelize.STRING
      },
      psw: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      dept: {
        type: Sequelize.STRING
      }
      
    });
  
    return Users;
  };