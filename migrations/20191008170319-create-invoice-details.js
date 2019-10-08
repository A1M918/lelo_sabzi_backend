'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoiceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unitPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      invoiceId: {
        field: 'invoice_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'invoice',
            key: 'id'
          },
          key: 'id',
          foreignKey: 'invoice_id'
        }
      },
      invoiceLine: {
        field: 'invoice_line',
        type: Sequelize.INTEGER,
        allowNull: false
      },
      productId: {
        field: 'product_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'products',
            key: 'id'
          },
          foreignKey: 'product_id'
        }
      },
      quantity: {
        field: 'qty',
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('invoiceDetails');
  }
};