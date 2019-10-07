const User = require('./User');

module.exports = (_sequelize, _Sequelize)=>{
    return _sequelize.define('invoice', {
        id: { type: _Sequelize.INTEGER, autoIncrement: true, primaryKey: true, },
        customer_id: {
            type: _Sequelize.INTEGER,
            references:{
                model: User(_sequelize,_Sequelize),
                key: id
            },
            datetime:{ type: _Sequelize.DATE, defaultValue: _Sequelize.NOW }
        },
        dateCreated:{type: _Sequelize.DATE, defaultValue: _Sequelize.NOW, allowNull:  false},
        totalBill: {type: _Sequelize.DOUBLE, field: 'total_bill'},
        invoiceDetail: {type: _Sequelize.DOUBLE, field: 'invoice_detail'}
      },{
          freezeTableName: true
      });
}