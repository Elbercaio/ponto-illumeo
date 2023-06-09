'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },

      userCode: {
        field: 'user_code',
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'code',
        },
      },

      recordType: {
        field: 'record_type',
        allowNull: false,
        type: Sequelize.DataTypes.ENUM,
        values: ['start', 'end'],
      },

      timestamp: {
        field: 'timestamp',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_records');
  },
};
