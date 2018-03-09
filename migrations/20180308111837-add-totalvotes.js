'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Users',
        'totalVotes',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users', 'totalVotes')
    ];
  }
};
