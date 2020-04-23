"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {}

  Account.init(
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
      modelName: "account",
    }
  );
  return Account;
};
