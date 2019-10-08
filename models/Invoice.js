const User = require('./User');

module.exports = (_sequelize, _Sequelize)=>{
    const Invoice =  _sequelize.define('invoice', {
        id: { type: _Sequelize.INTEGER, autoIncrement: true, primaryKey: true, },
        customer_id: {
            type: _Sequelize.INTEGER,
            allowNull: false,
            // references:{
            //     model: User(_sequelize,_Sequelize),
            //     key: id
            // },
            dateTime:{ type: _Sequelize.DATE, defaultValue: _Sequelize.NOW, field: 'datetime' }
        },
        dateCreated:{type: _Sequelize.DATE, defaultValue: _Sequelize.NOW, allowNull:  false},
        totalBill: {type: _Sequelize.DOUBLE, field: 'total_bill'},
        invoiceDetail: {type: _Sequelize.DOUBLE, field: 'invoice_detail'}
      },{
          freezeTableName: true
      });

      Invoice.associate = function(models){
        Invoice.belongsTo(models.User, {
            foreignKey: 'id',
            as: 'customer_id'
        })
      }

    return Invoice;
}