'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    productTitle: {
      type: DataTypes.STRING,
      field: 'product_title',
      allowNull: false
    },
    productCategory: {
      type: DataTypes.INTEGER,
      field: 'product_cat',
      allowNull: false
    },
    productBrand: {
      type: DataTypes.INTEGER,
      field: 'product_brand',
      allowNull: false
    },
    productPrice: {
      type: DataTypes.Double,
      field: 'product_price',
      allowNull: false
    },
    productDesc: {
      type: DataTypes.STRING,
      field: 'product_desc',
      allowNull: false
    },
    productImage: {
      type: DataTypes.STRING,
      field: 'product_image',
      allowNull: false
    },
    productKeywords: {
      type: DataTypes.STRING,
      field: 'product_keywords',
      allowNull: false
    },
  }, {});
  products.associate = function(models) {
    // associations can be defined here
    products.hasMany(models.invoiceDetails, {
      foreignKey: 'product_id'
    })
  };
  return products;
};