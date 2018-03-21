import { Component, Input, OnInit,OnChanges, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  EmployeeIdNameService } from '../../../shared';
import { Globals } from '../../../shared';
import { CurrencyPipe } from '@angular/common';

import { DataTable, DataTableResource } from 'angular-4-data-table';

@Component({
    selector: 'basic-details',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})

export class BasicComponent implements OnInit {

    ReimbursementDetails: any = [];
    claimList : any = [];
    claimValues : any =[];
    multipleData :any = {};
    PaymentData : any = [];
    noClaims: boolean = true;
    addReimbursementForm : boolean = true;
    whenMultiple : boolean = false;
    whenAccept:boolean = true;
    whenComment:boolean = true;
    whenHold:boolean = true;
    whenPaid:boolean =true;
    submitButton :boolean = false;
    saveButton: boolean = true;
    employeeDetailRecord:any;
    searchInput : string = '';
    inputName : string = '';
    empList:any;
    origDetails: any;
    SuccessSave : string = '';
    SuccessMail : string = '';
    noEmpDetail: boolean = false;
    claims = this.claimList;
    claimResource = new DataTableResource(this.claims);
    claimCount = 0;
    caption : string = "Add Claims"
    value = true;
    SumOfApprovedAmount : string = "";
    data : any = {}
    From_Claims :any;
    To_Claims : any;
    Type : any;
    filterStatus : string = "";
    selectedItems : any = [];
    empSet : any = [];
    dropdownSettings = {};
    test :any;


    @ViewChild(DataTable) claimsTable: DataTable;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private EmployeeDetail : EmployeeIdNameService
    ) {
        this.claimResource.count().then(count => this.claimCount = count);
    }
    @ViewChild('f') form: any;
    ngOnInit(): void {
        this.getEmployee();
    }

    hideTab() : void {
        this.addReimbursementForm = true;
    }

    employeeDetail (employeeData : any) {
        this.EmployeeDetail.getEmployeeIdName(employeeData).then(employeeDetails => {
            this.employeeDetailRecord = employeeDetails[0].data;
            this.ReimbursementDetails.Employee_Name = "";
            this.ReimbursementDetails.Employee_Email = "";
            if ( this.employeeDetailRecord !== undefined ) {
                var empId = employeeData;
                var resEmpId = empId.match(/inc/i);
                var symbol;

                if(resEmpId){
                    this.ReimbursementDetails.Amount_Type = "USD";
                }
                else {
                    this.ReimbursementDetails.Amount_Type = "INR";
                }
                this.value = true;
                this.ReimbursementDetails.Employee_Name = this.employeeDetailRecord[0].Employee_Name;
                this.ReimbursementDetails.Employee_Email = this.employeeDetailRecord[0].Email_Id;

            } else {
                this.value = false;
                var empId = employeeData;
                var resEmpId = empId.match(/inc/i);
                var symbol;

                if(resEmpId){
                    this.ReimbursementDetails.Amount_Type = "USD";
                }
                else {
                    this.ReimbursementDetails.Amount_Type = "INR";
                }
            }

        });
    }

    getEmployee(): void {
        this.EmployeeDetail.getEmployeeList().then(empDetails => {
            this.empList = empDetails[0].data;

            this.empList.forEach((val, index) => {
                this.empSet.push({ "id": val.Employee_Id, "itemName": val.Employee_Id, "deptId": val.Employee_Id });
            });
        });
    }

    addClaim() {
        this.addReimbursementForm = false;
    }

    formatEmployeeIds( dataList: any ): any {
        var formattedList = dataList;
        if ( dataList.length > 0 ) {
            formattedList = dataList.map(obj => {
                obj.Employee_Id = obj.Employee_Id.toUpperCase();
                return obj;
            });
        }
        return formattedList;
    }
}
