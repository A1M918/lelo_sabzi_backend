const Sequelize = require('sequelize');
const sequelize = new Sequelize('enew', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
  });

module.exports = sequelize;
module.exports =  function (){
    sequelize.sync().then(function() {
        console.log("Project Synchronize complete");
       });       
}