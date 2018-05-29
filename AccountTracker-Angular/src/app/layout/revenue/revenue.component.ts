import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { routerTransition } from '../../router.animations';
import * as Highcharts from 'highcharts';
import { Filter} from "./revenue.interface";
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';

import {  RevenueService } from '../../shared';

@Component({
    selector: 'app-revenue',
    templateUrl: './revenue.component.html',
    styleUrls: ['./revenue.component.scss'],
    animations: [routerTransition()]
})
export class RevenueComponent implements OnInit {
    // //  @ViewChild('DesignationCount') chartContainer: any;
    // //  @ViewChild('sourceOfHire') sourceOfHireContainer: any;
    // // public percent: number;
    // // public options: any;
    // // public designationCountDetails :any;
    // // public TotalCount: number;
    // // public BA: number;
    // // public SBA: number;
    // // public CONSULTANT: number;
    // // public MANAGER: number;
    // // public SE: number;
    // // public SSE: number;
    // // public TL: number;
    // // public Senior_Manager: number;
    // // public Portal : any;
    // // public Reference : any;
    // // public Vendor : any;
    // // public FilterData:any;
    // // public BAList: number;
    // // public SBAList: number;
    // // public consultantList: number;
    // // public managerList: number;
    // // public SEList: number;
    // // public SSEList: number;
    // // public TLList: number;
    // // public Senior_ManagerList: number;
    // // inputName : string = '';
    // // origDetails: any;
    // // tableBAHidden : boolean = false;
    // // tableSBAHidden : boolean = true;
    // // tableSEHidden : boolean = true;
    // // tableSSEHidden : boolean = true;
    // // tableConsultantHidden : boolean = true;
    // // tableManagerHidden : boolean = true;
    // // tableTLHidden : boolean = true;
    // // tableSenior_ManagerHidden : boolean = true;
    // // listArray = [];
    // // allData = [];
    // // From = "2015-01-02";
    // // Designation_Name:string= "";
    // // noValue : boolean = true;
    //
     //endDate  = (new Date()).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');
     startDate = (new Date()).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');
     endDate = (new Date()).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');

    constructor(public el: ElementRef,
                private http:Http,
                private revenueService: RevenueService
               )
    {

    }

    ngOnInit() {
        this.getRevenueReport();
        //this.getSourceOfHire();
    }

    getRevenueReport() {
        // check if model is valid
        console.log("Here....");
        var from = (new Date(this.startDate)).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');
        var to = (new Date(this.endDate)).toLocaleDateString('ko-KR').replace(new RegExp('. ', 'g'),'-').replace('.','');
        this.revenueService.getRevenueReport({start_date: from, end_date : to})
            .subscribe(
                (response) =>{
                    // let body = response.json();
                    let body = response;
                    console.log(body);
                    // this.origDetails = body[0].data;
                    // this.Designation_Name = body[0].data[0].Designation_Name;
                    // this.listArray =  body[0].data;
                    // this.noValue = false;
                },
                (error) => console.log(error)
            );
    }

    // getSourceOfHire() {
    //     // check if model is valid
    //     this.empExpReportsService.getEmployeeSourceOfHire({From: this.From, To: this.To})
    //         .then(
    //             (response) =>{
    //                 // let body = response.json();
    //                 let body = response;
    //                 this.Portal = body[0].data[0].Portal;
    //                 this.Reference = body[0].data[0].Reference;
    //                 this.Vendor = body[0].data[0].Vendor;
    //                 this.TotalCount = this.Portal + this.Reference + this.Vendor;
    //
    //                 let chartConfig = {
    //                      chart: {
    //                          plotBackgroundColor: null as any,
    //                          plotBorderWidth: null as any,
    //                          plotShadow: false,
    //                          type: 'pie',
    //                      },
    //                      title: {
    //                          text: ' Source of Hire -'+this.TotalCount
    //                      },
    //                      tooltip: {
    //                          pointFormat: '{series.name}: <b>{point.y}</b>'
    //                      },
    //                      plotOptions: {
    //                          pie: {
    //                              allowPointSelect: true,
    //                              cursor: 'pointer',
    //                              dataLabels: {
    //                                  enabled: true,
    //                                  format: '<b>{point.name}</b>: {point.y}',
    //                                  style: {
    //                                      //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    //                                  }
    //                              },
    //                              showInLegend : {
    //                                enabled : true
    //                              }
    //                          }
    //                      },
    //                      series: [{
    //                          colorByPoint: true,
    //                          data: [{
    //                              name: 'Portal',
    //                              y: this.Portal
    //                          }, {
    //                              name: 'Reference',
    //                              y: this.Reference ,
    //                          },{
    //                              name: 'Vendor',
    //                              y: this.Vendor
    //                          }],
    //                          point:{
    //                             events:{
    //                                 click: function (event) {
    //                                     alert("Success");
    //                                 }
    //                             }
    //                         }
    //                      }]
    //                  };
    //                  Highcharts.chart(this.sourceOfHireContainer.nativeElement, chartConfig);
    //             },
    //             (error) => console.log(error)
    //         );
    // }
    //
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
    // getEmployeeExpReports() {
    //     // check if model is valid
    //     this.empExpReportsService.getEmployeeDesignationCount({From: this.From, To: this.To})
    //         .then(
    //             (response) =>{
    //                 // let body = response.json();
    //                 let body = response;
    //                 var listDes = [];
    //                 this.allData = body[0].data;
    //                 if(body[0].data) {
    //                   for(var i=0; body[0].data[i]; i++){
    //                       let obj = {
    //                           name : body[0].data[i].Designation_Name,
    //                           y : body[0].data[i].Desg_Count,
    //                           desg_Id : body[0].data[i].Current_Designation
    //                       }
    //                       listDes.push(obj);
    //                   }
    //                   let chartConfig = {
    //                        chart: {
    //                            plotBackgroundColor: null as any,
    //                            plotBorderWidth: null as any,
    //                            plotShadow: false,
    //                            type: 'pie',
    //                        },
    //                        title: {
    //                            text: 'Designations vs. Count'
    //                        },
    //                        tooltip: {
    //                            pointFormat: '{series.name}: <b>{point.y}</b>'
    //                        },
    //                        legend: {
    //                             align: 'right',
    //                             layout: 'vertical',
    //                             verticalAlign: 'top',
    //                             labelFormatter: function() {
    //                                   return '<div class="' + this.name + '-arrow"></div><span>' + this.name +'</span><span> : ' + this.y + '</span>';
    //                             },
    //                             x: 40,
    //                             y: 0
    //                         },
    //                        plotOptions: {
    //                            pie: {
    //                                allowPointSelect: true,
    //                                cursor: 'pointer',
    //                                dataLabels: {
    //                                    enabled: true,
    //                                    format: '<b>{point.name}</b>: {point.y}',
    //                                    style: {
    //                                        //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    //                                    }
    //                                },
    //                                point : {
    //                                   events : {
    //                                       legendItemClick : (event) => {
    //                                           this.showTable(event.target.desg_Id);
    //                                           return false
    //                                        }
    //                                   }
    //                               },
    //                                showInLegend : {
    //                                  enabled : true
    //                                }
    //                            }
    //                        },
    //                        series: [{
    //                            colorByPoint: true,
    //                            data: listDes,
    //                             point : {
    //                                events : {
    //                                    click : (event) => {
    //                                        this.showTable(event.point.desg_Id);
    //                                     }
    //                                }
    //                            }
    //                        }]
    //                    };
    //                    Highcharts.chart(this.chartContainer.nativeElement, chartConfig);
    //                 }
    //                 else {
    //                   alert ("No data Found")
    //                 }
    //             },
    //             (error) => console.log(error)
    //         );
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
            const ws: any = utils.json_to_sheet(fileData);
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
            saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'data.xlsx');
    }
}
