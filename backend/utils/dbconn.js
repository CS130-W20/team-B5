const mysql = require('mysql2');
const con = mysql.createPool({
    host: "192.168.0.169",
    user: "brain",
    password: "",
    database: 'brain',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/*
con.connect(function (err) {
    if (err) throw err;
    console.log("MYSQL connection established!");
});
*/
module.exports= con;