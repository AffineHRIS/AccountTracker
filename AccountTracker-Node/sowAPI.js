'use strict';

const sowAPI = require('express').Router();

// Load dependencies
const convertExcel = require('excel-as-json').processFile;

var access = require('./var.js');
access.myFunc1();

    sowAPI.use(bodyParser.json());
    sowAPI.use(function (req, res, next) {
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
            callback(null, "./uploads/sow/");
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });

    sowAPI.post("/uploadSOW", multer({ storage: StorageFile }).array("uploads[]", 12), function(req, res) {
        res.send(req.files);
    });

    //Get sow details
    sowAPI.get('/SOWDetails/', function (req, res) {
      var id = req.query.MSAId;
      var sqlQuery = '';
      if(id)
      {
        //sqlQuery = "SELECT * FROM accountstracker.sow WHERE MSA_Id ='"+id+"'";
        sqlQuery = `SELECT a.Account_Id, a.Account_Name, m.MSA_Id,m.MSA_Name,s.*
                    FROM accountstracker.account a
                    left join accountstracker.msa m ON  a.Account_Id = m.Account_Id
                    left join accountstracker.sow s ON m.MSA_Id = s.MSA_Id
                    WHERE m.MSA_Id =`+id
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
    sowAPI.post('/api/addSOW', function (req, res) {
      var result = {};
      return knex1("sow")
      .insert({
        SOW_Name: req.body.SOW_Name,
        SOW_Number: req.body.SOW_Number,
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
        SOW_Invoice_Frequency: req.body.SOW_Invoice_Frequency,
        SOW_Invoice_Credit_Period: req.body.SOW_Invoice_Credit_Period,
        SOW_No_Of_Persons: req.body.SOW_No_Of_Persons,
        SOW_Document: req.body.SOW_Document,
        SOW_Max_Offshore_Hours_Per_Day: req.body.SOW_Max_Offshore_Hours_Per_Day,
        SOW_Currency: req.body.SOW_Currency,
        SOW_Onsite_Discount: req.body.SOW_Onsite_Discount,
        SOW_Offshore_Discount: req.body.SOW_Offshore_Discount,
        SOW_Additional: req.body.SOW_Additional
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
    sowAPI.put('/api/updateSOW', function (req, res) {
      var result = {};
      return knex1("sow")
      .update({
        SOW_Name: req.body.SOW_Name,
        SOW_Number: req.body.SOW_Number,
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
        SOW_Invoice_Frequency: req.body.SOW_Invoice_Frequency,
        SOW_Invoice_Credit_Period: req.body.SOW_Invoice_Credit_Period,
        SOW_No_Of_Persons: req.body.SOW_No_Of_Persons,
        SOW_Travel: req.body.SOW_Travel,
        SOW_Document: req.body.SOW_Document,
        SOW_Max_Offshore_Hours_Per_Day: req.body.SOW_Max_Offshore_Hours_Per_Day,
        SOW_Currency: req.body.SOW_Currency,
        SOW_Onsite_Discount: req.body.SOW_Onsite_Discount,
        SOW_Offshore_Discount: req.body.SOW_Offshore_Discount,
        SOW_Additional: req.body.SOW_Additional
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

    // Delete an SOW
    sowAPI.delete('/api/deleteSOW/:SOW_Id', function (req, res) {
      var result = {};
      return knex1("sow")
      .del()
      .where('SOW_Id', req.params.SOW_Id)
      .then(function(response) {
        //result['data'] = req.body;
        result['result'] = 'success';
        result['message'] = 'SOW deleted successfully!';
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send( result );
      })
      .catch(function (err) {
          console.log('Error while deleting SOW: %s', err.toString());
          res.status(400).send(err.toString());
      });

    });

module.exports = sowAPI;
