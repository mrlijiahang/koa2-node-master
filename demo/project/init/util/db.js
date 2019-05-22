const mysql = require('mysql')
//引入mysql
const config = require('./../../config')
const dbConfig = config.database

//创建连接池
const pool = mysql.createPool({
  host     :  dbConfig.HOST,
  user     :  dbConfig.USERNAME,
  password :  dbConfig.PASSWORD,
  database :  dbConfig.DATABASE
})


let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    // 连接池连接
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log( err )
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            console.log( err )
            reject( err )
          } else {
            resolve( rows )
          }
          //结束回话
          connection.release()
        })
      }
    })
  })

}


module.exports = {
  query
}