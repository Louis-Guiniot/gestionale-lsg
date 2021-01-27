import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectCustomers } from 'src/app/redux/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  elements = [];
  customerForm: FormGroup;

  constructor(private store: Store, private customerService: CustomerService, private fb: FormBuilder) {
    console.log(this.customerService.retreiveAllCustomers());
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    })

      this.store.pipe(select(selectCustomers)).subscribe((customers) => {
      for (let cust of customers) {
        this.elements.push(cust);
        console.log(cust);
      }
      return this.elements
    })
}

  insert(){
    console.log("email: "+this.customerForm.value.email)
    console.log("nome: "+this.customerForm.value.name)
    console.log("cognome: "+this.customerForm.value.surname)
    this.customerService.createCustomer(this.customerForm.value.email, this.customerForm.value.name, this.customerForm.value.surname)
  } 
  delete(id: string){
   this.customerService.deleteCustomer(id)
  }



}
