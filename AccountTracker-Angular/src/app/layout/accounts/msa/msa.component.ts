import { Component, Input, OnInit,OnChanges, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  MsaService, FileUploadService } from '../../../shared';
import { Globals } from '../../../shared';
import { CurrencyPipe } from '@angular/common';

import { DataTable, DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-msa',
  templateUrl: './msa.component.html',
  styleUrls: ['./msa.component.scss']
})
export class MsaComponent implements OnInit {

  MSADetails: any = {};

  submitButton :boolean = false;
  saveButton: boolean = true;
  addMSAForm : boolean = false;
  MSAList:any;
  SuccessSave : string = '';
  SuccessMail : string = '';
  accountId : string;
  accountName : string;
  MSA_thumbHidden:boolean = true;
  MSAFilePath = 'http://'+ this.globals.apiServerIP +':3200/uploads/msa/';


  @ViewChild(DataTable) MSATable: DataTable;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private msaService : MsaService,
      private globals : Globals,
      private fileUploadService : FileUploadService
  ) {
    this.filesToUpload = [];
  }
  @ViewChild('f') form: any;
  filesToUpload: Array<File>;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.accountId = params['id'];
       this.accountName  = params['name'];
       // this.loginid = sessionStorage.getItem('username');
       // if ( this.employeeid === undefined ) {
       //     this.employeeid = this.loginid;
       // }
       this.getMSA();
    });
  }

  upload(file) {
      this.fileUploadService.makeFileRequest('http://'+ this.globals.apiServerIP +':3200/uploadMSA', [], this.filesToUpload).then((result) => {
          console.log(file);
          this.MSADetails.MSA_Document =result[0].filename;
          this.MSA_thumbHidden =false;

          console.log(result[0].filename);
          // console.log(result);
      }, (error) => {
          console.error(error);
      });
  }

  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  hideTab() : void {
      this.addMSAForm = false;
  }

  getMSA(): void {

    this.msaService.getMSAList(this.accountId).subscribe(
        (response) =>{
            this.MSAList = response[0].data;
        },
        (error) => {
            alert(error);
            console.log(error);
        }
    );
  }

  addMSA() {
      this.form.reset();
      this.MSADetails = {};
      this.addMSAForm = true;

  }
  editMSA(msa) {
    console.log(msa);
    this.MSADetails = msa;
    this.MSADetails.Account_Name = this.accountName;
    this.addMSAForm = true;

  }

  getMSAId(msa) {
    return msa.MSA_Id;
  }
  getMSAName(msa) {
    return msa.MSA_Name;
  }

  save(model : any) {

      if (this.form.valid) {
          var modelData = Object.assign({}, model);
          modelData.Account_Id = this.accountId;

          if(this.MSADetails.MSA_Id === undefined) //This means new msa addition since there is no msa ID for initial save.
          {
            this.msaService.addMSADetails(modelData)
            .subscribe(
                (response) =>{
                    let body = response.json();

                    this.SuccessSave = body.message;
                    this.getMSA();
                    setTimeout(()=> {    //<<<---    using ()=> syntax
                        this.SuccessSave = "";
                    },4000);
                    this.addMSAForm = false;
                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );
          }
          else
          {
            modelData.MSA_Id = this.MSADetails.MSA_Id;
            this.msaService.updateMSADetails(modelData) // Updating existing MSA.
            .subscribe(
                (response) =>{
                    let body = response.json();

                    this.SuccessSave = body.message;
                    this.getMSA();
                    setTimeout(()=> {    //<<<---    using ()=> syntax
                        this.SuccessSave = "";
                    },4000);
                    this.addMSAForm = false;
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
