module.exports = (sequelize, Sequelize) => {
  const Payments = sequelize.define("payments", {
    userId: {
      type: Sequelize.INTEGER,
    },
    userEmail: {
      type: Sequelize.STRING,
    },
    payAmt: {
      type: Sequelize.FLOAT,
    },
    Status: {
      type: Sequelize.STRING,
    },
  });

  return Payments;
};
