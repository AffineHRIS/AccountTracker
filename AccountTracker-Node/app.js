// Module dependencies
'use strict';
var express  = require('express'),
mysql        = require('mysql'),
bodyParser   = require('body-parser')
// require the bcrypt module
const bcrypt = require('bcrypt');

var json2xls = require('json2xls');
// Local and server mysql hosts.
 var mysqlHost = '127.0.0.1'; // Local
// var mysqlHost = '192.168.0.128'; // Server


// Knex initialization and connection
var knex1 = require('knex')({
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
var con = mysql.createConnection({
  host : mysqlHost,
  user: "root",
  password: "test@123",
  multipleStatements: true,
  connectionLimit: 15,
  queueLimit: 50,
  acquireTimeout: 1000000
});

// Application initialization and Configuration
var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// Main route sends our HTML file
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Authenticate the user.
app.post('/authenticate', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  con.query('SELECT * FROM accountstracker.aa_user WHERE username = ?',[username], function (error, results, fields) {
    if ( error ) {
      res.json({
        status:false,
        message:'there is some error with query'
      });
    } else {
      if ( results.length > 0 ) {
        bcrypt.compare(password, results[0].password, function(err, ress) {
          // console.log(ress);
          if ( true ) {
            con.query('SELECT Employee_Name FROM accountstracker.employee_details WHERE Employee_Id = ?', [results[0].username], function (error1, results1, fields1) {
              if ( error1 ) {
                res.json({
                  status: true,
                  message: 'User Employee Not found!',
                  role: results[0].role,
                  empid: results[0].username,
                  empname: results[0].username
                });
              } else {
                if ( results1.length > 0 ) {
                  res.json({
                    status: true,
                    message: 'User authentication is successful!',
                    role: results[0].role,
                    empid: results[0].username,
                    empname: results1[0].Employee_Name
                  });
                } else {
                  res.json({
                    status: true,
                    message: 'User not found!',
                    role: results[0].role,
                    empid: results[0].username,
                    empname: results[0].username
                  });
                }
              }
            });
          } else {
            res.json({
              status:false,
              message:"Username and password does not match."
            });
          }

        });

      } else {
        res.json({
          status:false,
          message:"Username does not exists."
        });
      }
    }
  });
});


app.get('/employeeIdName/:data', function (req, res) {
  var id = req.params.data;
  var sqlQuery = "SELECT * FROM accountstracker.employee_details where Employee_Id='"+id+"'";
  con.query(sqlQuery, function(err, rows, fields) {
    if (!err){
      var response = [];

      if (rows.length != 0) {
        response.push({'result' : 'success', 'data' : rows});
      } else {
        response.push({'result' : 'error', 'msg' : 'No Results Found'});
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
  });
});

/***************************************Accounts***************************************/
//Get account details
app.get('/accountDetails/', function (req, res) {
  var id = req.params.data;
  var sqlQuery = "SELECT * FROM accountstracker.account";
  con.query(sqlQuery, function(err, rows, fields) {
    if (!err){
      var response = [];
      if (rows.length != 0) {
        response.push({'result' : 'success', 'data' : rows});
      } else {
        response.push({'result' : 'error', 'msg' : 'No Results Found'});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
  });
});


//POST / save account details
app.post('/api/addAccount', function (req, res) {
  var result = {};
  return knex1("account")
  .insert({
      Account_Name: req.body.Account_Name,
      Account_Manager: req.body.Account_Manager,
      Address: req.body.Address,
      City: req.body.City,
      Country: req.body.Country,
      Phone_Number: req.body.Phone_Number,
      Email_Id: req.body.Email_Id,
      Contact_Person: req.body.Contact_Person
  })
  .then(function(response) {
    //result['data'] = req.body;
    result['result'] = 'success';
    result['message'] = 'Account details saved successfully!';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send( result );
  })
  .catch(function (err) {
      console.log('Error while saving account details: %s', err.toString());
      res.status(400).send(err.toString());
  });
});

//PUT / update account details
app.put('/api/updateAccount', function (req, res) {
  var result = {};
  return knex1("account")
  .update({
      Account_Name: req.body.Account_Name,
      Account_Manager: req.body.Account_Manager,
      Address: req.body.Address,
      City: req.body.City,
      Country: req.body.Country,
      Phone_Number: req.body.Phone_Number,
      Email_Id: req.body.Email_Id,
      Contact_Person: req.body.Contact_Person
  })
  .where('Account_Id', req.body.Account_Id)
  .then(function(response) {
    //result['data'] = req.body;
    result['result'] = 'success';
    result['message'] = 'Account details updated successfully!';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send( result );
  })
  .catch(function (err) {
      console.log('Error while updating account details: %s', err.toString());
      res.status(400).send(err.toString());
  });
});



/***************************************MSA***************************************/
//Get msa details
app.get('/MSADetails/', function (req, res) {
  var id = req.query.accountId;
  var sqlQuery = '';
  if(id)
  {
    sqlQuery = "SELECT * FROM accountstracker.msa WHERE Account_Id ='"+id+"'";
  }
  else
  {
    sqlQuery = "SELECT * FROM accountstracker.msa";
  }

  con.query(sqlQuery, function(err, rows, fields) {
    if (!err){
      var response = [];
      if (rows.length != 0) {
        response.push({'result' : 'success', 'data' : rows});
      } else {
        response.push({'result' : 'error', 'msg' : 'No Results Found'});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
  });
});


//POST / save msa details
app.post('/api/addMSA', function (req, res) {
  var result = {};
  return knex1("msa")
  .insert({
      MSA_Name: req.body.MSA_Name,
      Account_Id: req.body.Account_Id,
      MSA_Start_Date: req.body.MSA_Start_Date,
      MSA_End_Date: req.body.MSA_End_Date,
      MSA_Client_Signing_Authority: req.body.MSA_Client_Signing_Authority,
      MSA_Client_Signing_Authority_Email:req.body.MSA_Client_Signing_Authority_Email,
      MSA_Client_Signing_Authority_Number: req.body.MSA_Client_Signing_Authority_Number,
      MSA_Payment_Terms: req.body.MSA_Payment_Terms,
      MSA_Client_Finance_Person:req.body.MSA_Client_Finance_Person,
      MSA_Client_Finance_Person_Email:req.body.MSA_Client_Finance_Person_Email,
      MSA_Affine_Signing_Authority: req.body.MSA_Affine_Signing_Authority,
      MSA_Affine_Signing_Authority_Email: req.body.MSA_Affine_Signing_Authority_Email,
      MSA_Affine_Signing_Authority_Number: req.body.MSA_Affine_Signing_Authority_Number,
      MSA_Legal_Person_Contact: req.body.MSA_Legal_Person_Contact,
      MSA_Document :req.body.MSA_Document
  })
  .then(function(response) {
    //result['data'] = req.body;
    result['result'] = 'success';
    result['message'] = 'MSA details saved successfully!';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send( result );
  })
  .catch(function (err) {
      console.log('Error while saving msa details: %s', err.toString());
      res.status(400).send(err.toString());
  });
});

//PUT / update msa details
app.put('/api/updateMSA', function (req, res) {
  var result = {};
  return knex1("msa")
  .update({
    MSA_Name: req.body.MSA_Name,
    Account_Id: req.body.Account_Id,
    MSA_Start_Date: req.body.MSA_Start_Date,
    MSA_End_Date: req.body.MSA_End_Date,
    MSA_Client_Signing_Authority: req.body.MSA_Client_Signing_Authority,
    MSA_Client_Signing_Authority_Email:req.body.MSA_Client_Signing_Authority_Email,
    MSA_Client_Signing_Authority_Number: req.body.MSA_Client_Signing_Authority_Number,
    MSA_Payment_Terms: req.body.MSA_Payment_Terms,
    MSA_Client_Finance_Person:req.body.MSA_Client_Finance_Person,
    MSA_Client_Finance_Person_Email:req.body.MSA_Client_Finance_Person_Email,
    MSA_Affine_Signing_Authority: req.body.MSA_Affine_Signing_Authority,
    MSA_Affine_Signing_Authority_Email: req.body.MSA_Affine_Signing_Authority_Email,
    MSA_Affine_Signing_Authority_Number: req.body.MSA_Affine_Signing_Authority_Number,
    MSA_Legal_Person_Contact: req.body.MSA_Legal_Person_Contact,
    MSA_Document :req.body.MSA_Document
  })
  .where('MSA_Id', req.body.MSA_Id)
  .then(function(response) {
    //result['data'] = req.body;
    result['result'] = 'success';
    result['message'] = 'MSA details updated successfully!';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send( result );
  })
  .catch(function (err) {
      console.log('Error while updating MSA details: %s', err.toString());
      res.status(400).send(err.toString());
  });
});



/***************************************SOW***************************************/
//Get sow details
app.get('/SOWDetails/', function (req, res) {
  var id = req.query.MSAId;
  var sqlQuery = '';
  if(id)
  {
    sqlQuery = "SELECT * FROM accountstracker.sow WHERE MSA_Id ='"+id+"'";
  }
  else
  {
    sqlQuery = "SELECT * FROM accountstracker.sow";
  }

  con.query(sqlQuery, function(err, rows, fields) {
    if (!err){
      var response = [];
      if (rows.length != 0) {
        response.push({'result' : 'success', 'data' : rows});
      } else {
        response.push({'result' : 'error', 'msg' : 'No Results Found'});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
  });
});


//POST / save sow details
app.post('/api/addSOW', function (req, res) {
  var result = {};
  return knex1("sow")
  .insert({
    SOW_Name: req.body.SOW_Name,
    MSA_Id: req.body.MSA_Id,
    SOW_Description: req.body.SOW_Description,
    SOW_Start_Date: req.body.SOW_Start_Date,
    SOW_End_Date: req.body.SOW_End_Date,
    SOW_Value: req.body.SOW_Value,
    SOW_Monthly_Value: req.body.SOW_Monthly_Value,
    SOW_Onsite_Count: req.body.SOW_Onsite_Count,
    SOW_Offshore_Count: req.body.SOW_Offshore_Count,
    SOW_Onsite_Rate: req.body.SOW_Onsite_Rate,
    SOW_Max_Onsite_Hours_Per_Day: req.body.SOW_Max_Onsite_Hours_Per_Day,
    SOW_Offshore_Rate: req.body.SOW_Offshore_Rate,
    SOW_Invoice_Term: req.body.SOW_Invoice_Term,
    SOW_No_Of_Persons: req.body.SOW_No_Of_Persons,
    SOW_Document: req.body.SOW_Document
  })
  .then(function(response) {
    //result['data'] = req.body;
    result['result'] = 'success';
    result['message'] = 'SOW details saved successfully!';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send( result );
  })
  .catch(function (err) {
      console.log('Error while saving SOW details: %s', err.toString());
      res.status(400).send(err.toString());
  });
});

//PUT / update sow details
app.put('/api/updateSOW', function (req, res) {
  var result = {};
  return knex1("sow")
  .update({
    SOW_Name: req.body.SOW_Name,
    MSA_Id: req.body.MSA_Id,
    SOW_Description: req.body.SOW_Description,
    SOW_Start_Date: req.body.SOW_Start_Date,
    SOW_End_Date: req.body.SOW_End_Date,
    SOW_Value: req.body.SOW_Value,
    SOW_Monthly_Value: req.body.SOW_Monthly_Value,
    SOW_Onsite_Count: req.body.SOW_Onsite_Count,
    SOW_Offshore_Count: req.body.SOW_Offshore_Count,
    SOW_Onsite_Rate: req.body.SOW_Onsite_Rate,
    SOW_Max_Onsite_Hours_Per_Day: req.body.SOW_Max_Onsite_Hours_Per_Day,
    SOW_Offshore_Rate: req.body.SOW_Offshore_Rate,
    SOW_Invoice_Term: req.body.SOW_Invoice_Term,
    SOW_No_Of_Persons: req.body.SOW_No_Of_Persons,
    SOW_Travel: req.body.SOW_Travel,
    SOW_Document: req.body.SOW_Document
  })
  .where('SOW_Id', req.body.SOW_Id)
  .then(function(response) {
    //result['data'] = req.body;
    result['result'] = 'success';
    result['message'] = 'SOW details updated successfully!';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send( result );
  })
  .catch(function (err) {
      console.log('Error while updating SOW details: %s', err.toString());
      res.status(400).send(err.toString());
  });
});
// Change user password.
app.post('/api/changePassword', function (req, res) {
    var un = req.body.username,
        cp = req.body.Current_Password,
        np = req.body.New_Password;

        knex1.select('id', 'username', 'password')
        .from('aa_user')
        .where('username', un)
        .timeout(10000, {cancel: true})
        .map(function (row) { return row; })
        .then(function(userDetails = []){
            // console.log( userDetails[0].password );

            if ( userDetails.length ) {
                bcrypt.compare(cp, userDetails[0].password, function(err, ress) {
                    // console.log( ress );
                    if ( ress ) {
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(np, salt);
                        knex1('aa_user')
                        .where('id', userDetails[0].id)
                        .update({
                            password: hash,
                            last_password_changed_at: knex1.fn.now()
                        })
                        .then(function(response){
                            // console.log(response);
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).send({
                                result: 'success',
                                message:'Your password has been changed. Please log in again.'
                            });
                        });

                  } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                        result: 'failure',
                        message:'Current password is not valid to change your password.'
                    });
                  }

                });
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({
                    result: 'failure',
                    message:'Sorry, could not change your password. Please contact the administrator.'
                });
            }
        })
        .catch(function (err) {
            console.log('Error: %s', err.toString());
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
                result: 'failure',
                message:'Some error occured. Please contact the administrator.'
            });
        });
});


// Begin listening
app.listen(3100, function() {
    console.log("Express server listening on port 3100");
});
