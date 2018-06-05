import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { routerTransition } from '../../../../router.animations';
import * as Highcharts from 'highcharts';
//import { Filter} from "./revenue.interface";
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';

import { DataTable, DataTableResource } from 'angular-4-data-table';
import {  RevenueService } from '../../../../shared';

@Component({
    selector: 'app-actual-revenue',
    templateUrl: './actual.component.html',
    styleUrls: ['./actual.component.scss'],
    animations: [routerTransition()]
})
export class ActualRevenueComponent implements OnInit {

     origDetails:any = [];
     isData: boolean = false;
     totalRevenue:number = 0;
     USD_INR:number = 65;
     USD_GBP:number = 0.75;
     totalINR:number = 0;
     totalGBP:number = 0;
     totalUSD:number = 0;
     startDate = new Date(new Date().getTime() - ( 30 * 24 * 60 * 60 * 1000 )).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');
     endDate = (new Date()).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');

    @ViewChild(DataTable) accountsTable: DataTable;
    constructor(public el: ElementRef,
                private http:Http,
                private revenueService: RevenueService
               )
    {

    }

    ngOnInit() {
        //this.getRevenueReport();
    }

    getRevenueReport() {
        // check if model is valid
        // this.origDetails = [];
        // this.isData =  false;
        // this.totalRevenue = 0;
        // this.totalUSD = 0;
        // this.totalINR = 0;
        // this.totalGBP = 0;
        // var from = (new Date(this.startDate)).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');
        // var to = (new Date(this.endDate)).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');
        // if(new Date(this.startDate) < new Date(this.endDate))
        // {
        //   this.revenueService.getRevenueReport({start_date: from, end_date : to})
        //       .subscribe(
        //           (response) =>{
        //               // let body = response.json();
        //               let body = response;
        //
        //               this.origDetails = body[0].data;
        //               for (var ele in this.origDetails)
        //               {
        //                 switch(this.origDetails[ele].SOW_Currency)
        //                 {
        //                   case 'USD':
        //                     this.totalUSD+= this.origDetails[ele].SOW_Est_Revenue;
        //                     break;
        //                   case 'INR':
        //                     this.totalINR+= this.origDetails[ele].SOW_Est_Revenue;
        //                     break;
        //                   case 'GBP':
        //                     this.totalGBP+= this.origDetails[ele].SOW_Est_Revenue;
        //                     break;
        //                   default:
        //                     this.totalUSD+= this.origDetails[ele].SOW_Est_Revenue;
        //                     break;
        //                 }
        //
        //               }
        //               this.totalRevenue = this.totalUSD+(this.totalINR/this.USD_INR)+(this.totalGBP/this.USD_GBP);
        //               this.isData = this.origDetails[0].SOW_Id ? true : false;
        //               // this.Designation_Name = body[0].data[0].Designation_Name;
        //               // this.listArray =  body[0].data;
        //               // this.noValue = false;
        //           },
        //           (error) => console.log(error)
        //       );
        // }
        // else {
        //   alert("'From' date should be less than 'To' date");
        // }

    }

    onCurrencyChange(event) {
      console.log(event.target.name);
      console.log(event.target.value);
      this.totalRevenue = this.totalUSD+(this.totalINR/this.USD_INR)+(this.totalGBP/this.USD_GBP);

    }
    // searchValue(value: any): void {
    //     let searchId: string = this.inputName.toLowerCase();
    //     this.listArray = [];
    //     this.listArray = this.origDetails.filter(function(val, ind, arr){
    //       var status = (
    //           ( val.Employee_Id !== undefined && val.Employee_Id !== null && val.Employee_Id.toLowerCase().indexOf(searchId) !== -1 ) ||
    //           ( val.Employee_Name!== undefined && val.Employee_Name !== null && val.Employee_Name.toLowerCase().indexOf(searchId) !== -1 )
    //       );
    //       return status;
    //     });
    // }
    //




    // showTable(value:any) : void {
    //     this.getDesignationDetails(value);
    // }
    // filter() {
    //     this.getEmployeeExpReports();
    //     this.getSourceOfHire();
    //     this.noValue = true;
    //     this.getDesignationDetails({});
    // }
    fileDownload(fileData:any) : void {

            const ws_name = 'SomeSheet';
            const wb: WorkBook = { SheetNames: [], Sheets: {} };
            const ws: any = utils.json_to_sheet(this.origDetails);
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

            var s2ab = function(s) {
                const buf = new ArrayBuffer(s.length);
                const view = new Uint8Array(buf);
                for (let i = 0; i !== s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                };
                return buf;
            }
            var date = new Date();
            var timestamp = date.getUTCDate()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCFullYear();
            saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'Revenue Report '+timestamp+'.xlsx');
    }
}
