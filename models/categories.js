'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    CategoryTitle: {
      type: DataTypes.STRING,
      field: 'cat_title',
      unique: true
    }
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
    Categories.hasMany(models.products, {
      foreignKey: 'cat_id'
    })
  };
  return Categories;
};