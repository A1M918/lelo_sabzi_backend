'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.STRING, allowNull: false}
  }, {});
  Accounts.associate = function(models) {
    // associations can be defined here
    Accounts.hasMany(models.invoice, {
      foreignKey:'invoice_id'
    })
  };
  return Accounts;
};