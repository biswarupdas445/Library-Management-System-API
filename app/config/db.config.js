module.exports = {
    HOST: "172.18.0.2",
    USER: "postgres",
    PASSWORD: "raju.123",
    DB: "LMSA-DB",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };