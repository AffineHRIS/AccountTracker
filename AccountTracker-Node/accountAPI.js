'use strict';

const accountAPI = require('express').Router();

// Load dependencies
const convertExcel = require('excel-as-json').processFile;

var access = require('./var.js');
access.myFunc1();

    accountAPI.use(bodyParser.json());
    accountAPI.use(function (req, res, next) {
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

    //Get account details
    accountAPI.get('/accountDetails/', function (req, res) {
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

    //Get account details report
    accountAPI.get('/accountReport/', function (req, res) {
      var id = req.params.data;
      var sqlQuery = `SELECT *
                      FROM accountstracker.account a
                      left join accountstracker.msa m ON  a.Account_Id = m.Account_Id
                      left join accountstracker.sow s ON m.MSA_Id = s.MSA_Id `;
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
    accountAPI.post('/api/addAccount', function (req, res) {
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
    accountAPI.put('/api/updateAccount', function (req, res) {
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

    // Delete an account
    accountAPI.delete('/api/deleteAccount/:Account_Id', function (req, res) {
      var result = {};
      return knex1("account")
      .del()
      .where('Account_Id', req.params.Account_Id)
      .then(function(response) {
        //result['data'] = req.body;
        result['result'] = 'success';
        result['message'] = 'Account deleted successfully!';
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send( result );
      })
      .catch(function (err) {
          console.log('Error while deleting account: %s', err.toString());
          res.status(400).send(err.toString());
      });

    });

module.exports = accountAPI;
