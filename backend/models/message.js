'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message, {
        onDelete: "CASCADE"
      })
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
      })
    }
  };
  Message.init({

    title: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    username: DataTypes.STRING,
    picture: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};

