'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Users',
        'encryptedPassword',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Uers', 'email'),
      queryInterface.removeColumn('Users', 'encryptedPassword')
    ];
  }
};
