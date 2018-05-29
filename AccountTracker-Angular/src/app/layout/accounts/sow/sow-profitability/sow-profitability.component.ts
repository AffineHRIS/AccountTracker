import { Component, OnInit, SimpleChanges,OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

import { ProfitabilityService } from '../../../../shared';
@Component({
  selector: 'app-sow-profitability',
  templateUrl: './sow-profitability.component.html',
  styleUrls: ['./sow-profitability.component.scss']
})
export class SowProfitabilityComponent implements OnChanges  {

  @Input() sowId: any;
  @Input() sowDetails: any;
  @Input() profitabilityDetails:any;
  @Input() disableInputs:any;
  @Output() newEmergency = new EventEmitter();

  profitabilityForm: FormGroup;
  disableClose: boolean = true;
  dataStream: any;
  totalCost:number = 0;
  showSaveWarning: boolean = false;
  sowValue:number = 0;
  profitability:number = 0;
  profitabilityPercent:number = 0;
  currency: any;
  index: any = -1;
  profitabilityList:any;
  addFlag:boolean = false;
  showSummary:boolean = false;
  hideType:boolean = false;

  constructor(
    private fb: FormBuilder,
    private profitabilityService: ProfitabilityService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.createForm();
    console.log(this.sowId);
    this.getProfitabilityDetails();
  }

  getProfitabilityDetails(): void {

    this.profitabilityService.getProfitabilityList(this.sowId).subscribe(
        (response) =>{
            this.totalCost = 0;
            this.profitabilityDetails = response[0].data;
            if( this.profitabilityDetails && this.profitabilityDetails.length ){

                //this.sowValue = parseInt(this.profitabilityDetails[0].SOW_Value);
                //this.currency = this.profitabilityDetails[0].SOW_Currency;
                this.sowValue = parseInt(this.sowDetails.SOW_Value);
                this.currency = this.sowDetails.SOW_Currency;

                for(var i = 0; i < this.profitabilityDetails.length; i++)
                {
                  this.totalCost += parseInt(this.profitabilityDetails[i].Profitability_Cost);
                  this.addProfitability(this.profitabilityDetails[i]);
                }
                this.showSummary = true;
                this.profitability = this.sowValue - this.totalCost;
                var val = (1-(this.totalCost/this.sowValue))*100;
              this.profitabilityPercent = parseFloat(val.toFixed(2));
            }
             else {
                //this.addProfitability(undefined);
                this.showSummary = false;
            }
        },
        (error) => {
            alert(error);
            console.log(error);
        }
    );
  }


  createForm() {
      this.profitabilityForm = this.fb.group({
          empId: '',
          profitabilities: this.fb.array([])
      });
  }

  get profitabilities(): FormArray {
      return this.profitabilityForm.get('profitabilities') as FormArray;
  };


  addProfitability(dataObj = undefined) {

    var prData = {};
    if(dataObj)
    {
      prData = {
        'P_Id': new FormControl({value:  dataObj.P_Id, disabled: true }),
        'Profitability_Resource_Level': new FormControl({value: dataObj.Profitability_Resource_Level , disabled: true},Validators.required),
        'Profitability_Resource_Type': new FormControl({value: dataObj.Profitability_Resource_Type , disabled: true},Validators.required),
        'Profitability_Resource_Location': new FormControl({value: dataObj.Profitability_Resource_Location , disabled: true},Validators.required),
        'Profitability_No_Of_Resources': new FormControl({value: dataObj.Profitability_No_Of_Resources , disabled: true},Validators.required),
        'Profitability_No_Of_Weeks': new FormControl({value: dataObj.Profitability_No_Of_Weeks , disabled: true},Validators.required),
        'Profitability_Rate': new FormControl({value: dataObj.Profitability_Rate , disabled: true},Validators.required),
        'Profitability_Additional': new FormControl({value: dataObj.Profitability_Additional , disabled: true}),
        'Profitability_Cost': new FormControl({value: dataObj.Profitability_Cost , disabled: true},Validators.required)
        }
        this.profitabilities.push(this.fb.group( prData ));
    }
    else
    {
      if(this.showSaveWarning)
      {
        alert("You opened one record for edit. Please save/delete/cancel-edit on that and try again.");
      }
      else
      {
        this.showSaveWarning = true;
        //this.addFlag = true;
        prData = {
          //'P_Id': new FormControl({value:  dataObj ? dataObj.P_Id : '', disabled: this.disableInputs}),
          'Profitability_Resource_Level': new FormControl({value:   '', disabled: false},Validators.required),
          'Profitability_Resource_Type': new FormControl({value:   '', disabled: false},Validators.required),
          'Profitability_Resource_Location': new FormControl({value:   '', disabled: false},Validators.required),
          'Profitability_No_Of_Resources': new FormControl({value:   '', disabled: false},Validators.required),
          'Profitability_No_Of_Weeks': new FormControl({value:   '', disabled: false},Validators.required),
          'Profitability_Rate':new FormControl({value:   '', disabled: false},Validators.required),
          'Profitability_Additional': new FormControl({value:   '', disabled: false}),
          'Profitability_Cost': new FormControl({value:   '', disabled: true},Validators.required)
          }
          this.profitabilities.push(this.fb.group( prData ));
          this.index = this.profitabilities.length;
      }

    }

  }

 hideForm(i): boolean {
   return this.index === i;
 }

 hideDelete(i): boolean {
   if(this.addFlag && this.index === i)
   {
     return true;
   }
   else
   {
      return this.index === i;
   }
 }

  removeProfitability(index) {
      this.profitabilities.removeAt( index );
  }

  editProfitability(row,i) {
    if(this.showSaveWarning)
    {
      alert("You opened one record for edit. Please save/cancel-edit on that and try again.");
    }
    else
    {
      this.showSaveWarning = true;
      this.index = i+1;
      //row.enable();
      //row.controls.Profitability_Cost.disable();
      this.onResourceChange(row);
    }
  }

  cancelEdit(row) {
    this.showSaveWarning = false;
    //this.addFlag = false;
    this.index = -1;
    this.createForm();
    this.getProfitabilityDetails();
  }

  onResourceChange(row) {
    console.log(row);
    if(row.controls.Profitability_Resource_Level.value == 'others')
    {
      console.log(row);
      row.controls.Profitability_Resource_Type.reset();
      row.controls.Profitability_Resource_Location.reset();
      row.controls.Profitability_No_Of_Resources.reset();
      row.controls.Profitability_No_Of_Weeks.reset();
      row.controls.Profitability_Rate.reset();
      row.controls.Profitability_Additional.reset();

      row.enable();
      row.controls.Profitability_Resource_Location.disable();
      row.controls.Profitability_Resource_Location.disable();
      row.controls.Profitability_No_Of_Resources.disable();
      row.controls.Profitability_No_Of_Weeks.disable();
      row.controls.Profitability_Rate.disable();
      row.controls.Profitability_Additional.disable();
      this.hideType = true;
    }
    else
    {
      row.enable();
      row.controls.Profitability_Resource_Type.reset();
      row.controls.Profitability_Cost.disable();
      this.hideType = false;
    }
  }

  deleteProfitability(row,index): void {
    if(this.showSaveWarning)
    {
      alert("You opened one record for edit. Please save/cancel-edit on that and try again.");
    }
    else
    {
      this.showSaveWarning = false;
      var deletePr = confirm("Delete this row ?");
      if ( deletePr )  {
        var model = row.value.P_Id;
        if( model === undefined || model === '')
        {
          this.removeProfitability(index);
        }
        else if ( model ) {
          this.profitabilityService.deleteProfitabilityDetails(model)
          .then(
            (response) =>{
              // let body = response.json();
              let body = response;
              this.createForm();
              this.getProfitabilityDetails();
              alert(body.message);
            },
            (error) => {
              this.createForm();
              this.getProfitabilityDetails();
              alert(error);
              console.log(error);
            }
          );
        }
        else {
          alert("Profitability details are not found. Please report to the administrator. " + model.toString());
        }
      }
    }

  }

  saveThisProfitability(row) {
      this.showSaveWarning = false;
      if (row.valid) {
          this.index = -1;
          //this.addFlag = false;
          //var sowHours = row.value.Profitability_Resource_Location == 'onsite'?  this.profitabilityDetails[0].SOW_Max_Onsite_Hours_Per_Day : this.profitabilityDetails[0].SOW_Max_Offshore_Hours_Per_Day;
          var sowHours = row.value.Profitability_Resource_Location == 'onsite'?  this.sowDetails.SOW_Max_Onsite_Hours_Per_Day : this.sowDetails.SOW_Max_Offshore_Hours_Per_Day;
          var additional = row.value.Profitability_Additional ? row.value.Profitability_Additional : 0;
          var cost = ((row.value.Profitability_No_Of_Resources)*(row.value.Profitability_No_Of_Weeks*5)*(sowHours)*(row.value.Profitability_Rate)) + additional;
          var modelData = row.value;//Object.assign({}, model);
          modelData.SOW_Id = this.sowId;
          if(row.value.Profitability_Resource_Level != 'others')
          {
            modelData.Profitability_Cost = cost;
          }

          modelData.Profitability_Additional = row.value.Profitability_Additional ? row.value.Profitability_Additional : 0;

          if(modelData.P_Id === '' || modelData.P_Id === undefined) //This means new profitability addition since there is no ID for initial save.
          {
            this.profitabilityService.addProfitabilityDetails(modelData)
            .subscribe(
                (response) =>{
                    let body = response.json();

                    //this.SuccessSave = body.message;
                    this.createForm();
                    this.getProfitabilityDetails();
                    setTimeout(()=> {    //<<<---    using ()=> syntax
                        //this.SuccessSave = "";
                    },4000);
                    //this.addSOWForm = false;
                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );
          }
          else
          {
            this.profitabilityService.updateProfitabilityDetails(modelData) // Updating existing record.
            .subscribe(
                (response) =>{
                    let body = response.json();

                    //this.SuccessSave = body.message;
                    this.createForm();
                    this.getProfitabilityDetails();
                    setTimeout(()=> {    //<<<---    using ()=> syntax
                        //this.SuccessSave = "";
                    },4000);
                    //this.addSOWForm = false;
                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );
          }

      }
      else {
          alert("Required fields are manadatory");
      }
  }

}
