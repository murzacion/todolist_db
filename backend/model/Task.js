const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "tb_tasks",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      auto_increment: true
    },
    text: {
      type: Sequelize.STRING
    },
    datein: {
      type: Sequelize.STRING
    },
    done: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
);
