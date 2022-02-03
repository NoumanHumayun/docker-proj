"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title is required" },
          notEmpty: { msg: "Title cannot be empty" },
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      //define table name
      tableName: "posts",
      modelName: "Post",
    }
  );
  Post.associate = function(models) {
    models.Post.hasMany(models.Comment, {
      foreignKey: 'id'
    });
    models.Post.belongsTo(models.User);
  };
  return Post;
};
