module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {

      f_name: {
        type: Sequelize.STRING
      },
      l_name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      dept: {
        type: Sequelize.STRING
      }
      
    });
  
    return Users;
  };