'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('customers', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.DataTypes.STRING,
      passwordHash: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      createdAt: {
        field: 'createdAt',
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updatedAt',
        type: Sequelize.DATE,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
