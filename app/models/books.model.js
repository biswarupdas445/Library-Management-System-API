module.exports = (sequelize, Sequelize) => {
    const Books = sequelize.define("books", {

      ISBN: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      copyNo: {
        type: Sequelize.INTEGER
      }
      
    });
  
    return Books;
  };