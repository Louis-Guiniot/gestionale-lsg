
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";

import { Response } from '../../core/model/Response.interface';

import { createInvoice, deleteInvoice, initInvoices, retrieveAllInvoices, retrieveLastInvoice } from "./invoice.actions";


@Injectable()
export class InvoicesEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        return this.http.retrieveGetCall<Response>("invoice/findAll");
    }

    deleteInvoice(id:string):Observable<Response>{
        return this.http.retrievePostCall("invoice/delete",{id})
    }
    deleteInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteInvoice),
        switchMap((action) => this.deleteInvoice(
            action.id).pipe(
            map((response) => initInvoices({ response })),
            tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));

    retreiveLastInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        //console.log(this.http.retrieveGetCall<Response>("invoice/findLast"))
        return this.http.retrieveGetCall<Response>("invoice/findLast");
    }


    getAllInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllInvoices),
        switchMap(() => this.retreiveAllInvoice().pipe(
            map((response) => initInvoices({ response }))
        ))
    ));


    getLastInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveLastInvoice),
        switchMap(() => this.retreiveLastInvoice().pipe(
            map((response) => initInvoices({ response }))
        ))
    ));    

    createInvoice(products:string, date:string, sale:string, imponibile:string, condizionePagamento:string,docType:string, idCustomer:string, ): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/create',{products, date,sale, imponibile,condizionePagamento, docType, idCustomer});
    }
    
    createInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createInvoice),
        switchMap((action) => this.createInvoice(
            action.products,
            action.date,
            action.sale,
            action.imponibile,
            action.condizionePagamento,
            action.docType,
            action.idCustomer).pipe(
            map((response) => initInvoices({ response })),
           tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));


    // getAllInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(retrieveAllInvoices),
    //     switchMap(() => this.retreiveAllinvoices().pipe(
    //         map((response) => initProducts({ response }))
    //     ))
    // ));


    // getLastInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(retrieveAllInvoices),
    //     switchMap(() => this.retreiveLastInvoice().pipe(
    //         map((response) => initInvoices({ response }))
    //     ))
    // ));        

    // //è sbagliato ma no sbatti di farne un altro
   
    // createInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(createInvoice),
    //     switchMap((action) => this.createInvoice(
    //         action.prodottiLista,
    //         action.totalPrice,
    //         action.customerId,
    //         action.sconto).pipe(
    //         map((response) => initInvoices({ response })),
    //         tap(()=>this.router.navigateByUrl('/fattura'))
    //     ))
    // ));

    
    
    
}
