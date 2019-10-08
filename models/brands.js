'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brands = sequelize.define('Brands', {
    brandTitle: {
      type: DataTypes.STRING,
      field: 'brand_title',
      unique: true
    }
  }, {});
  Brands.associate = function(models) {
    // associations can be defined here
    Brands.hasMany(models.products, {
      foreignKey: 'brand_id'
    })
  };
  return Brands;
};