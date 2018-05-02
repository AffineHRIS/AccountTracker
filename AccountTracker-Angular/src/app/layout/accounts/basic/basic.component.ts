import { Component, Input, OnInit,OnChanges, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  AccountDetailService } from '../../../shared';
import { Globals } from '../../../shared';
import { CurrencyPipe } from '@angular/common';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';

import { DataTable, DataTableResource } from 'angular-4-data-table';

@Component({
    selector: 'basic-details',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})

export class BasicComponent implements OnInit {

    AccountDetails: any = {};

    submitButton :boolean = false;
    saveButton: boolean = true;
    addAccountForm : boolean = false;
    accList:any;
    SuccessSave : string = '';
    SuccessMail : string = '';
    accDetailsInArray: any = [];


    @ViewChild(DataTable) accountsTable: DataTable;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private accountDetailService : AccountDetailService
    ) {

    }
    @ViewChild('f') form: any;
    ngOnInit(): void {
        this.getAccounts();
    }

    hideTab() : void {
        this.addAccountForm = false;
    }

    getAccounts(): void {

      this.accountDetailService.getAccountList().subscribe(
          (response) =>{
              this.accList = response[0].data;
              this.accDetailsInArray = Object.assign([], response[0].data);
          },
          (error) => {
              alert(error);
              console.log(error);
          }
      );
    }

    addAccount() {
        this.form.reset();
        this.AccountDetails = {};
        this.addAccountForm = true;

    }
    editAccount(account) {
      this.AccountDetails = account;
      this.addAccountForm = true;

    }
    getAccountId(account) {
      return account.Account_Id;
    }
    getAccountName(account) {
      return account.Account_Name;
    }

    deleteAccount(account): void {
      var deleteAccount = confirm("Delete this account ?");
      if ( deleteAccount )  {
        var model = this.getAccountId(account);
        if ( model ) {
          this.accountDetailService.deleteAccountDetails(model)
          .then(
            (response) =>{
              // let body = response.json();
              let body = response;
              this.getAccounts();
              alert(body.message);
            },
            (error) => {
              this.getAccounts();
              alert(error);
              console.log(error);
            }
          );
        } else {
          alert("Account details are not found. Please report to the administrator. " + model.toString());
        }
      }
    }

    save(model : any) {

        if (this.form.valid) {
            var modelData = Object.assign({}, model);
            modelData.Account_Id = this.AccountDetails.Account_Id;

            if(modelData.Account_Id == undefined) //This means new account addition since there is no account ID for initial save.
            {
              this.accountDetailService.addAccountDetails(modelData)
              .subscribe(
                  (response) =>{
                      let body = response.json();

                      this.SuccessSave = body.message;
                      this.getAccounts();
                      setTimeout(()=> {    //<<<---    using ()=> syntax
                          this.SuccessSave = "";
                      },4000);
                      this.addAccountForm = false;
                  },
                  (error) => {
                      alert(error);
                      console.log(error);
                  }
              );
            }
            else
            {
              this.accountDetailService.updateAccountDetails(modelData) // Updating existing account.
              .subscribe(
                  (response) =>{
                      let body = response.json();

                      this.SuccessSave = body.message;
                      this.getAccounts();
                      setTimeout(()=> {    //<<<---    using ()=> syntax
                          this.SuccessSave = "";
                      },4000);
                      this.addAccountForm = false;
                  },
                  (error) => {
                      alert(error);
                      console.log(error);
                  }
              );
            }

        }
        else {
            alert("Required fields are manadatory")
        }
    }

    fileDownload() : void {

      this.accountDetailService.getDetailedReport().subscribe(
          (response) =>{
              var fileData = response[0].data;

              // for (let i = 0; i < fileData.length; i++) {
              //   for (let j = 0; j < this.hiddenColumnsList.length; j++) {
              //       delete fileData[i][this.hiddenColumnsList[j]];
              //   }
              // }

              const ws_name = 'Account_Details';
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
              var date = new Date();
              var timestamp = date.getUTCDate()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCFullYear();
              saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'Accounts Report '+timestamp+'.xlsx');
          },
          (error) => {
              alert(error);
              console.log(error);
          }
      );
    }

}
