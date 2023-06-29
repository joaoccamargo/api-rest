import Sequelize from "sequelize";

const connection = new Sequelize("games", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00"
});

export default connection;
