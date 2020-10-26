import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl} from "@angular/forms";




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // formData = new FormGroup({
  //   name: new FormControl("", [Validators.required]),
  //   email: new FormControl(),
  //   shipping: new FormGroup({
  //     "city": new FormControl(),
  //     "address": new FormControl(),
  //   }),
  // });

  //["", [同步驗證], [非同步驗證（要到後端的）]]

  formData = this.fb.group({
    name: ["", [Validators.required, this.customValidator]],
    email: [{value: "", disabled: true}],
    shipping: this.fb.group({
      city: "",
      address: "",
    }),
    // {phoneType: "office", phone: "123123"}
    contactNumber: this.fb.array([
      this.fb.group({
        phoneType: "",
        phoneNumber:"",
      })
    ])
  })

  constructor(private fb: FormBuilder) { 

  }

  customValidator(c: AbstractControl){
    //return null;

    if(c.value == "777"){
      return {"nogood": true}
    }
    return null;
  }


  get contactNumbersArray(){
    return this.formData.get("contactNumber") as FormArray
  }



  ngOnInit(): void {
    this.formData.controls.name.valueChanges.subscribe({
      next: value => {
        if(value == "123"){
          this.formData.controls.email.enable();
          this.formData.get("shipping.city").enable();
        }else{
          this.formData.controls.email.disable();
          this.formData.get("shipping.city").disable();
          
        }
      }
    })

    // 更新資料的方式，詳細請參考文件
    this.formData.setValue({})
    this.formData.patchValue({})
    this.formData.reset()
  }

  addContact(){
    this.contactNumbersArray.push(this.fb.group({
      phoneType: "",
      phoneNumber:"",
    }))
  }

  removeContact(idx){
    this.contactNumbersArray.removeAt(idx);
  }

  clearAll(){
    this.contactNumbersArray.clear();
  }
}
