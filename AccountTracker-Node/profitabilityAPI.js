'use strict';

const profitabilityAPI = require('express').Router();

// Load dependencies
const convertExcel = require('excel-as-json').processFile;

var access = require('./var.js');
access.myFunc1();

    profitabilityAPI.use(bodyParser.json());
    profitabilityAPI.use(function (req, res, next) {
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



    //Get Profitability details
    profitabilityAPI.get('/ProfitabilityDetails/', function (req, res) {
      var id = req.query.SOWId;
      var sqlQuery = '';

        sqlQuery = `SELECT *
                      FROM accountstracker.sow s
                      right join accountstracker.profitability p ON p.SOW_Id = s.SOW_Id
                      WHERE s.SOW_Id =`+id


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
    profitabilityAPI.post('/api/addProfitability', function (req, res) {
      var result = {};
      return knex1("profitability")
      .insert(req.body
      //   {
      //   'SOW_Id': req.body.SOW_Id,
      //   'Profitability_Resource_Level': req.body.Profitability_Resource_Level,
      //   'Profitability_Resource_Type': req.body.Profitability_Resource_Type,
      //   'Profitability_Resource_Location': req.body.Profitability_Resource_Location,
      //   'Profitability_No_Of_Resources': req.body.Profitability_No_Of_Resources,
      //   'Profitability_No_Of_Weeks': req.body.Profitability_No_Of_Weeks,
      //   'Profitability_Rate': req.body.Profitability_Rate,
      //   'Profitability_Cost': req.body.Profitability_Cost
      // }
    )
      .then(function(response) {
        //result['data'] = req.body;
        result['result'] = 'success';
        result['message'] = 'Profitability details saved successfully!';
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send( result );
      })
      .catch(function (err) {
          console.log('Error while saving Profitability details: %s', err.toString());
          res.status(400).send(err.toString());
      });
    });

    //PUT / update sow details
    profitabilityAPI.put('/api/updateProfitability', function (req, res) {
      var result = {};
      return knex1("profitability")
      .update(req.body)
      .where('P_Id', req.body.P_Id)
      .then(function(response) {
        //result['data'] = req.body;
        result['result'] = 'success';
        result['message'] = 'Profitability details updated successfully!';
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send( result );
      })
      .catch(function (err) {
          console.log('Error while updating Profitability details: %s', err.toString());
          res.status(400).send(err.toString());
      });
    });

    // Delete an SOW
    profitabilityAPI.delete('/api/deleteProfitability/:P_Id', function (req, res) {
      var result = {};
      return knex1("profitability")
      .del()
      .where('P_Id', req.params.P_Id)
      .then(function(response) {
        //result['data'] = req.body;
        result['result'] = 'success';
        result['message'] = 'Profitability deleted successfully!';
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send( result );
      })
      .catch(function (err) {
          console.log('Error while deleting Profitability: %s', err.toString());
          res.status(400).send(err.toString());
      });

    });

module.exports = profitabilityAPI;
