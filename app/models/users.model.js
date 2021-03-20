module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {


      email_id: {
        type: Sequelize.STRING
      },
      psw: {
        type: Sequelize.STRING
      },
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