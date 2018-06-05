'use strict';

const revenueAPI = require('express').Router();

// Load dependencies
const convertExcel = require('excel-as-json').processFile;
const moment = require('moment');
require('moment-weekday-calc');
var momentBusiness = require('moment-business-days');

var access = require('./var.js');
access.myFunc1();

    revenueAPI.use(bodyParser.json());
    revenueAPI.use(function (req, res, next) {
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

    //Get revenue details
    revenueAPI.get('/getRevenue/', function (req, res) {

      var startDate = req.query.start_date;
      var endDate = req.query.end_date;
      //var FirstDay = new Date(year, month, 1);
      //var LastDay = new Date(year, month + 1, 0);
      console.log(momentBusiness(startDate, 'YYYY-MM-DD').monthBusinessDays().length)
      console.log(startDate);
      var account_Filter = req.query.account ? " AND a.Account_Id IN ( "+req.query.account+ " )" : "";
      var sow_Filter = req.query.sow ? " AND s.SOW_Id IN ( "+req.query.sow+ " )" : "";

      var sqlQuery = `SELECT a.Account_Id, a.Account_Name, m.MSA_Id,m.MSA_Name,s.SOW_Id, s.SOW_Name,s.SOW_Start_Date,s.SOW_End_Date, s.SOW_Value, s.SOW_Onsite_Count, s.SOW_Onsite_Rate, s.SOW_Max_Onsite_Hours_Per_Day, s.SOW_Offshore_Count, s.SOW_Offshore_Rate, s.SOW_Max_Offshore_Hours_Per_Day ,s.SOW_Currency
                      FROM accountstracker.account a right join accountstracker.msa m
                        ON  a.Account_Id = m.Account_Id right join accountstracker.sow s
                        ON m.MSA_Id = s.MSA_Id
                      WHERE NOT (s.SOW_Start_Date >'`+ endDate +`' OR s.SOW_End_Date < '`+startDate+"')"+account_Filter+sow_Filter;

      con.query(sqlQuery, function(err, rows, fields) {
        if (!err){
          var response = [];
          var data = rows;
          for (var i = 0; i < data.length; i++)
          {
            var currEle = data[i];
            var start = new Date(currEle.SOW_Start_Date) > new Date(startDate) ? new Date(currEle.SOW_Start_Date) : new Date(startDate);
            var end = new Date(currEle.SOW_End_Date) < new Date(endDate) ? new Date(currEle.SOW_End_Date) : new Date(endDate);

            var prorated_work_days = moment().weekdayCalc([start.getFullYear(),start.getMonth(),start.getDate()],[end.getFullYear(),end.getMonth(),end.getDate()],[1,2,3,4,5]);
            var actual_work_days = moment().weekdayCalc([new Date(currEle.SOW_Start_Date).getFullYear(),new Date(currEle.SOW_Start_Date).getMonth(),new Date(currEle.SOW_Start_Date).getDate()],[new Date(currEle.SOW_End_Date).getFullYear(),new Date(currEle.SOW_End_Date).getMonth(),new Date(currEle.SOW_End_Date).getDate()],[1,2,3,4,5]);

            var finalVal = ((currEle.SOW_Onsite_Count*currEle.SOW_Onsite_Rate*currEle.SOW_Max_Onsite_Hours_Per_Day) + (currEle.SOW_Offshore_Count*currEle.SOW_Offshore_Rate*currEle.SOW_Max_Offshore_Hours_Per_Day))*(prorated_work_days)
            currEle.SOW_Est_Revenue = finalVal;//(prorated_work_days/actual_work_days)*currEle.SOW_Value;
          }
          if (rows.length != 0) {
            response.push({'result' : 'success', 'data' : data});
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



module.exports = revenueAPI;
