module.exports = (_sequelize, _Sequelize){
    return _sequelize.define('user', {
        id: { type: _Sequelize.INTEGER, autoIncrement: true, primaryKey: true, },
      username: _Sequelize.STRING,
      password: _Sequelize.STRING,
      email: _Sequelize.STRING,
      isAdmin: { type: _Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
    },{
        freezeTableName: true
    });
     
}