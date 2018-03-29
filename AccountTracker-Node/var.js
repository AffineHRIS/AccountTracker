var myFunc1 = function() {
    express = require('express');
    mysql = require('mysql');
    multer = require('multer');
    bodyParser = require('body-parser');
    bcrypt = require('bcrypt');

    // local database viariable
    mysqlHost = '127.0.0.1';

    // Knex initialization and connection
    knex1 = require('knex')({
      client: 'mysql',
      connection: {
        host : mysqlHost,
        user : 'root',
        password : 'test@123',
        database : 'accountstracker'
      },
      pool: { min: 0, max: 7 }
    });

    // Database setup
    con = mysql.createConnection({
      host : mysqlHost,
      user: "root",
      password: "test@123",
      multipleStatements: true,
      connectionLimit: 15,
      queueLimit: 50,
      acquireTimeout: 1000000
    });
};

exports.myFunc1 = myFunc1;
