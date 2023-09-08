const sqlconnection= require("mysql");

const sqldbconnection= sqlconnection.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'warehouse',
    multipleStatements:true
});

sqldbconnection.connect((err)=>{
     if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');

});

module.exports = sqldbconnection;
