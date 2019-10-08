'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoice', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateTime: {
        type: Sequelize.DATE,
        field: 'datetime',
        defaultValue: Sequelize.NOW
      },      
      customerId: {
        type: Sequelize.INTEGER,
        field: 'customer_id',
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
          foreignKey: 'customer_id'
        }
      },
      totalBill: {
        type: Sequelize.DOUBLE,
        field: 'total_bill'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('invoice');
  }
};