import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
import { env as _env } from "process";
import config from "../config/config.json";

const env = _env.NODE_ENV || "development";
const db = {};

let sequelize;
if (config[env].use_env_variable) {
  sequelize = new Sequelize(_env[config[env].use_env_variable], config[env]);
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
  );
}

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== _basename(__filename) &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file)).default;
    model(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
