'use strict';

const msaAPI = require('express').Router();

// Load dependencies
const convertExcel = require('excel-as-json').processFile;

var access = require('./var.js');
access.myFunc1();

    msaAPI.use(bodyParser.json());
    msaAPI.use(function (req, res, next) {
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

    // File uploader.
    var StorageFile = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./uploads/msa/");
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });

    msaAPI.post("/uploadMSA", multer({ storage: StorageFile }).array("uploads[]", 12), function(req, res) {
        res.send(req.files);
    });

    //Get msa details
    msaAPI.get('/MSADetails/', function (req, res) {
      var id = req.query.accountId;
      var sqlQuery = '';
      if(id)
      {
        //sqlQuery = "SELECT * FROM accountstracker.msa WHERE Account_Id ='"+id+"'";
        sqlQuery = `SELECT a.Account_Id, a.Account_Name, m.*
                    FROM accountstracker.account a
                    left join accountstracker.msa m ON  a.Account_Id = m.Account_Id
                    WHERE a.Account_ID =`+id;
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
    msaAPI.post('/api/addMSA', function (req, res) {
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
          MSA_Payment_Frequency: req.body.MSA_Payment_Frequency,
          MSA_Payment_Credit_Period: req.body.MSA_Payment_Credit_Period,
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
    msaAPI.put('/api/updateMSA', function (req, res) {
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
        MSA_Payment_Frequency: req.body.MSA_Payment_Frequency,
        MSA_Payment_Credit_Period: req.body.MSA_Payment_Credit_Period,
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

    // Delete an MSA
    msaAPI.delete('/api/deleteMSA/:MSA_Id', function (req, res) {
      var result = {};
      return knex1("msa")
      .del()
      .where('MSA_Id', req.params.MSA_Id)
      .then(function(response) {
        //result['data'] = req.body;
        result['result'] = 'success';
        result['message'] = 'MSA deleted successfully!';
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send( result );
      })
      .catch(function (err) {
          console.log('Error while deleting MSA: %s', err.toString());
          res.status(400).send(err.toString());
      });

    });

module.exports = msaAPI;
