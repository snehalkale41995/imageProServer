const sql = require('mssql')
const winston = require('winston');

 var config = 
   {
     user: 'adminuser', // update me
     password: 'Admin@123', // update me 
     server: 'spice20200528125824dbserver.database.windows.net', // update me
     database: 'Spice20200528131853_db',
     options: 
        { 
             encrypt: true
           , trustedConnection: true
        },
        multipleStatements: true   
      }; 

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        winston.info('Connected to database successfully.')
        return pool
    })
    .catch(err => winston.error('Database Connection Failed!', err))

module.exports = {
    sql, poolPromise
}
