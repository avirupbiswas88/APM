import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from './customer';
import { debounceTime } from 'rxjs/operators';

function ratingRange(c: AbstractControl): {[key: string]: boolean} | null {

  if(c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)){
    return {'range': true};
  }
  return null;
}

function ratingRangeParameterised(min: number, max: number): ValidatorFn{

  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if(c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)){
      return {'range': true};
    }
    return null;
  };
}

function emailCompare(c: AbstractControl): {[key:string]: boolean} | null {

  const emailControl = c.get('email');
  const confirmEmailControl = c.get('confirmEmail');
 // console.log(emailControl);
 // console.log(confirmEmailControl);

  if(emailControl.pristine || confirmEmailControl.pristine){
    return null;
  }

  if(emailControl.value === confirmEmailControl.value){
    return null;
  }

  return {'unmatch':true};
}

@Component({
  //selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  //data model to pass back and forth customer data in form
  customer = new Customer;
  emailMessage: string;
  private validationMessages = {
    required: 'please enter your email address',
    email: 'please enter valid email address'
  }



  constructor(private formBuilder:FormBuilder) { }

  get addresses(): FormArray{
    return <FormArray>this.customerForm.get('addresses');
  }

  //template form model tracks form value and states- this defines set of form groups and form controls that matched up
  //with HTML form input elements
  //form model validations using Validators class
  ngOnInit(): void {

    //Using service FormBuilder to build form moder without initializing instances for each form control
    this.customerForm = this.formBuilder.group({
      firstName: ['',[Validators.required,Validators.minLength(3)]],
      lastName: ['',[Validators.required,Validators.maxLength(50)]],  //{value:'n/a',disabled:true}/[{value:'n/a',disabled:true}]
      emailGroup: this.formBuilder.group({
        email: ['',[Validators.required,Validators.email]],
        confirmEmail: ['',[Validators.required]],
      },{validator: emailCompare}),
      phone: '',
      notification: 'email',
      rating: [null,ratingRangeParameterised(1,5)],
      sendCatalog: true,
      addresses: this.formBuilder.array([this.buildAddress()])
      
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setMessages(emailControl)
    );

   /* this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)  //initialized with default value
    })*/
  }

  //custom validation based on user input
  setNotification(notifyVia: string): void{

    const phoneControl = this.customerForm.get('phone');
    if(notifyVia === 'text'){
      phoneControl.setValidators(Validators.required);
    }else{
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();

  }

  setMessages(c: AbstractControl): void{
    this.emailMessage='';
    if((c.touched || c.dirty) && c.errors){
      this.emailMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
    }
  }

  //return instance of address form group
  buildAddress(): FormGroup{
    return this.formBuilder.group({
      addressType: 'work',
      street1:'',
      street2: '',
      city: '',
      state: '',
      zip:''
    })
  }

  //add address
  addAddress(): void{
    this.addresses.push(this.buildAddress())
  }

  //custom validations

  //prepopulating data with 
  //setValue()-set value for all form control attributes 
  //patchValue()- set value for optional form control attributes
  populateTestData(){
  this.customerForm.setValue({
    firstName: 'Avirup',
    lastName: 'Biswas',
    email: 'buro@buro.com',
    sendCatalog: false
  })
  /*this.customerForm.patchValue({
    firstName: 'Avirup',
    lastName: 'Biswas',
    sendCatalog: false
  })*/
  }

  save(){
    console.log(this.customerForm);
    console.log('Saved: '+ JSON.stringify(this.customerForm.value));
  }

}
