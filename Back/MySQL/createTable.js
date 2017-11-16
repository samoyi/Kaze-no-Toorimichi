
const mysql = require('mysql');

const db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'test',
});

db.query(
    'CREATE TABLE IF NOT EXISTS nodejs ('
    + 'id INT(10) NOT NULL AUTO_INCREMENT, '
    + 'name VARCHAR(10), '
    + 'age TINYINT(3),'
    + 'PRIMARY KEY(id))',
    function(err) {
        if (err) throw err;
    }
);
