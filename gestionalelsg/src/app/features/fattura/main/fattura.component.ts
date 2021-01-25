import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { selectInvoices } from 'src/app/redux/invoice';


import { FatturaService } from '../services/fattura.service';

@Component({
  selector: 'app-fattura',
  templateUrl: './fattura.component.html',
  styleUrls: ['./fattura.component.scss']
})
export class FatturaComponent implements OnInit {
  [x: string]: any;
  fatture:any;
 

  constructor(private store: Store, private fatturaService: FatturaService) { 
    //this.fatturaService.retrieveAllInvoices();
    this.fatturaService.retrieveLastInvoice();
 
  }

  ngOnInit(): void {
    
    this.store.pipe(select(selectInvoices)).subscribe((invoice) => { 
     
        this.fatture=invoice; 
        console.log("fattura finale: ", this.fatture)   
    }
    
    )
    
  }

  // get invoices(): Observable<Invoice[]> {
  //   return this.store.pipe(select(selectInvoices));
  // }

}
