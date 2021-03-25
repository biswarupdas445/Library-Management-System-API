module.exports = (sequelize, Sequelize) => {
  const Records = sequelize.define("records", {
    userId: {
      type: Sequelize.INTEGER,
    },
    userEmail: {
      type: Sequelize.STRING,
    },
    ISBN: {
      type: Sequelize.STRING,
    },
    Operation: {
      type: Sequelize.STRING,
    },
    
  });

  return Records;
};
