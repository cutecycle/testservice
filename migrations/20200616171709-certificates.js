'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('certificates', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      customerId: Sequelize.DataTypes.INTEGER,
      publicKey: Sequelize.DataTypes.STRING,
      privateKey: Sequelize.DataTypes.STRING,
      active: Sequelize.DataTypes.BOOLEAN,
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
