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

const user = db.define("user", {
  username: sequelize.STRING,
  password: sequelize.STRING,
});

db.sync();

// user
//   .create({
//     username: "victor.nguyen",
//     password: "123456",
//   })
//   .then((user) => console.log(user.get({plain:true})));

// user
//   .destroy({
//     where: {
//       id: 2,
//     },
//   })
//   .then((row) => console.log(row));

// user
//   .update(
//     { username: "victor" },
//     {
//       where: {
//         id: 1,
//       },
//     }
//   )
//   .then((row) => console.log(row));

// user
//   .findOne({
//     where: {
//       id: 1,
//     },
//     raw: true
//   })
//   .then((row) => console.log(row));

// user
//   .findAll({
//     raw: true,
//   })
//   .then((rows) => rows.forEach((row) => console.log(row)));

user
  .findByPk(1, {
    raw: true,
  })
  .then((row) => console.log(row));
