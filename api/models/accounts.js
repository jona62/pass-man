"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {}

  Accounts.init(
    {
      website: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "accounts",
    }
  );
  return Accounts;
};
