import { Component, Input, OnInit,OnChanges, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  AccountDetailService } from '../../../shared';
import { Globals } from '../../../shared';
import { CurrencyPipe } from '@angular/common';

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

}
