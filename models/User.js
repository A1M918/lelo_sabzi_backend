'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    name: DataTypes.STRING,
  }, {});
//   User.associate = function(models) {
//     // associations can be defined here
//     User.belongsTo(models.Invoice,{
//         foreignKey: ''
//     })
//   };
  return User;
};