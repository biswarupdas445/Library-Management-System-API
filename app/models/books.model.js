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
      auther: {
        type: Sequelize.STRING
      },
      copyNo: {
        type: Sequelize.INTEGER
      }
      
    });
  
    return Books;
  };