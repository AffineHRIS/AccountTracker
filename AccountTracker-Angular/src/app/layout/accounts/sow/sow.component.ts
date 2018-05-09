import { Component, Input, OnInit,OnChanges, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SowService, FileUploadService } from '../../../shared';
import { Globals } from '../../../shared';
import { CurrencyPipe } from '@angular/common';
//import { Globals } from '../../global';

import { DataTable, DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-sow',
  templateUrl: './sow.component.html',
  styleUrls: ['./sow.component.scss']
})
export class SowComponent implements OnInit {
  SOWDetails: any = {};

  submitButton :boolean = false;
  saveButton: boolean = true;
  addSOWForm : boolean = false;
  SOWList:any;
  SuccessSave : string = '';
  SuccessMail : string = '';
  MSAId : string;
  MSAName : string;
  SOW_thumbHidden:boolean = true;
  SOWFilePath = 'http://'+ this.globals.apiServerIP +':3200/uploads/sow/';
  Account_Id : any;
  isSOW : any;
  sowId : any;
  enablePr = false;
  showPr = false;

  @ViewChild(DataTable) SOWTable: DataTable;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private sowService : SowService,
      private globals : Globals,
      private fileUploadService : FileUploadService
  ) {
      this.filesToUpload = [];
  }
  @ViewChild('f') form: any;
  filesToUpload: Array<File>;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.MSAId = params['id'];
       this.MSAName  = params['name'];

       this.getSOW();
    });
      //this.getSOW();
  }
  upload(file) {
      this.fileUploadService.makeFileRequest('http://'+ this.globals.apiServerIP +':3200/uploadSOW', [], this.filesToUpload).then((result) => {
          console.log(file);
          this.SOWDetails.SOW_Document =result[0].filename;
          this.SOW_thumbHidden =false;

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
      this.addSOWForm = false;
      this.showPr = false;
  }

  getSOW(): void {

    this.sowService.getSOWList(this.MSAId).subscribe(
        (response) =>{
            this.SOWList = response[0].data;
            this.Account_Id = response[0].data[0].Account_Id;
            this.isSOW = response[0].data[0].SOW_Id ? true : false;
        },
        (error) => {
            alert(error);
            console.log(error);
        }
    );
  }

  addSOW() {
      this.form.reset();
      this.SOWDetails = {};
      this.addSOWForm = true;
      this.enablePr = false;
      this.showPr = false;

  }
  editSOW(sow) {
    console.log(sow);
    this.SOWDetails = sow;
    //this.SOWDetails.Account_Name = this.accountName;
    this.addSOWForm = true;
    this.sowId = this.getSOWId(sow);
    this.enablePr = true;

  }

  getSOWId(sow) {
    return sow.SOW_Id;
  }

  showProfitability() {
    this.showPr = true;
  }

  hideProfitability() {
    this.showPr = false;
  }

  deleteSOW(sow): void {
    var deleteSOW = confirm("Delete this SOW ?");
    if ( deleteSOW )  {
      var model = this.getSOWId(sow);
      if ( model ) {
        this.sowService.deleteSOWDetails(model)
        .then(
          (response) =>{
            // let body = response.json();
            let body = response;
            this.getSOW();
            alert(body.message);
          },
          (error) => {
            this.getSOW();
            alert(error);
            console.log(error);
          }
        );
      } else {
        alert("SOW details are not found. Please report to the administrator. " + model.toString());
      }
    }
  }

  save(model : any) {

      if (this.form.valid) {
          var modelData = Object.assign({}, model);
          modelData.MSA_Id = this.MSAId;

          if(this.SOWDetails.SOW_Id === undefined) //This means new msa addition since there is no msa ID for initial save.
          {
            this.sowService.addSOWDetails(modelData)
            .subscribe(
                (response) =>{
                    let body = response.json();

                    this.SuccessSave = body.message;
                    this.getSOW();
                    setTimeout(()=> {    //<<<---    using ()=> syntax
                        this.SuccessSave = "";
                    },4000);
                    this.addSOWForm = false;
                    this.showPr = false;
                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );
          }
          else
          {
            modelData.SOW_Id = this.SOWDetails.SOW_Id;
            this.sowService.updateSOWDetails(modelData) // Updating existing MSA.
            .subscribe(
                (response) =>{
                    let body = response.json();

                    this.SuccessSave = body.message;
                    this.getSOW();
                    setTimeout(()=> {    //<<<---    using ()=> syntax
                        this.SuccessSave = "";
                    },4000);
                    this.addSOWForm = false;
                    this.showPr = false;
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
