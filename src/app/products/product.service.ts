import { Injectable } from '@angular/core';
import { Product } from './product.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
//creating service and register to Root Injector
@Injectable({
    providedIn:'root'
})
export class ProductService{
   // productUrl: string='/api/products/products.json';
   // private productsUrl = 'api/products';
   private productsUrl='http://localhost:8088/docker/products';
   private productUrl='http://localhost:8088/docker/product';
    //injecting http client dependency
    constructor(private http: HttpClient){}

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.productsUrl).pipe(
            tap(data => console.log('All: '+ JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    /*getProduct(id: number): Observable<Product> {
        return this.getProducts()
          .pipe(
            map((products: Product[]) => products.find(p => p.productId === id))
          );
      }*/
    
    getProduct(id: number): Observable<Product> {
        if (id === 0) {
          return of(this.initializeProduct());
        }
        const url = `${this.productUrl}/${id}`;
        return this.http.get<Product>(url)
          .pipe(
            tap(data => console.log('getProduct: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    //exception handling
    private handleError(err: HttpErrorResponse){
        let errorMessage='';
        if(err.error instanceof ErrorEvent){
            errorMessage= `An error occurred: ${err.error.message}`;
        }else{
            errorMessage= `server returned error: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage); 
    }

    deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<Product>(url, { headers })
          .pipe(
            tap(data => console.log('deleteProduct: ' + id)),
            catchError(this.handleError)
          );
      }
    
      private initializeProduct(): Product {
        // Return an initialized object
        return {
          productId: 0,
          productName: null,
          productCode: null,
          tags: [''],
          releaseDate: null,
          price: null,
          description: null,
          starRating: null,
          imageUrl: null
        };
      }

}