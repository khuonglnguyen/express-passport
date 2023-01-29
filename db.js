const sequelize = require("sequelize");

const db = new sequelize({
  database: "demo",
  username: "postgres",
  password: "aA123!@#",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
  define: {
    freezeTableName: true,
  },
});

db.authenticate()
  .then(() => {
    console.log("Success!");
  })
  .catch((err) => {
    console.log(err);
  });

const user = db.define("user",{
    username:sequelize.STRING,
    password: sequelize.STRING
});

db.sync()
