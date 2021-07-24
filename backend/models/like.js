'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Like, {
        onDelete:"CASCADE"
      })
      models.Message.hasMany(models.Like, {
        onDelete:"CASCADE"
      })

      models.User.belongsToMany(models.Message, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'messageId',
      });

      models.Message.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'messageId',
        otherKey: 'userId',
      });

      models.Like.belongsTo(models.User, {
        foreignKey: {
         name: 'userId',
         allowNull: false
        }
      });

      models.Like.belongsTo(models.Message, {
        foreignKey: {
          name: 'messageId',
          allowNull: false
         }
      });


    }
  };
  Like.init({
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLike: {
      type: DataTypes.INTEGER,
    },
  },

    {
      sequelize,
      modelName: 'Like',
    });
  return Like;
};