'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'product_title',
      },
      productCategory: {
        type: Sequelize.INTEGER,
        field: 'product_cat',
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
          foreignKey: 'product_cat'
        }
      },
      productBrand: {
        type: Sequelize.INTEGER,
        field: 'product_brand',
        allowNull: false,
        references: {
          model: 'Brands',
          key: 'id',
          foreignKey: 'product_brand'
        }
      },
      productPrice: {
        type: Sequelize.DOUBLE,
        field: 'product_price',
        allowNull: false
      },
      productDesc: {
        type: Sequelize.STRING,
        field: 'product_desc',
        allowNull: false
      },
      productImage: {
        type: Sequelize.STRING,
        field: 'product_image',
        allowNull: false
      },
      productKeywords: {
        type: Sequelize.STRING,
        field: 'product_keywords',
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
    return queryInterface.dropTable('products');
  }
};