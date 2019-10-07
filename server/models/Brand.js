module.exports = (_sequelize, _Sequelize) => {
    return _sequelize.define('brands', {
        id: { type: _Sequelize.INTEGER, autoIncrement: true, primaryKey: true, },
        brand_title: _Sequelize.STRING,
      },{
          freezeTableName: true
      });
}