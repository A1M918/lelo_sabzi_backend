'use strict';
module.exports = (sequelize, DataTypes) => {
  const invoiceDetails = sequelize.define('invoiceDetails', {
    unitPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    invoiceId: {
      field: 'invoice_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    invoiceLine: {
      field: 'invoice_line',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      field: 'product_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      field: 'qty',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  invoiceDetails.associate = function(models) {
    // associations can be defined here
  };
  return invoiceDetails;
};