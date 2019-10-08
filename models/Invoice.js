'use strict';
module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define('invoice', {
    dateTime: {
      type: DataTypes.DATE,
      field: 'datetime',
      defaultValue: DataTypes.NOW
    },    
    customerId: {
      type: DataTypes.INTEGER,
      field: 'customer_id',
      allowNull: false
    },
    totalBill: {
      type: DataTypes.DOUBLE,
      field: 'total_bill'
    }
  }, {});
  invoice.associate = function(models) {
    // associations can be defined here
    invoice.hasMany(models.invoiceDetails, {
      foreignKey: 'invoice_id',
      key: 'id'
    })
  };
  return invoice;
};