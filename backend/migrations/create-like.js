'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "messages",
          key: "id"
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "users",
          key: "id"
        }
      },
      isLike: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  }
};