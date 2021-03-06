'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg :"Email déjà utilisé"
          }
        }
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING, 
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};