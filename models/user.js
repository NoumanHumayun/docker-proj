"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "It must be a valid Email" },
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      website: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      //define table name
      tableName: "users",
      modelName: "User",
    }
  );
  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };
  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSaltSync(10, "a");
      user.password = bcrypt.hashSync(user.password, salt);
    }
  });
  User.beforeUpdate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSaltSync(10, "a");
      user.password = bcrypt.hashSync(user.password, salt);
    }
  });
  User.associate = function (models) {
    models.User.hasMany(models.Post, {
      foreignKey: "id",
    });
  };
  return User;
};
