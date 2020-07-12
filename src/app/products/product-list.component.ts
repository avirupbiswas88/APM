import { Component, OnInit } from '@angular/core'
import { Product } from './product.model'
import {ProductService} from './product.service'

@Component({
   // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImageFlag: boolean = true;
    imageText = 'Image';
    imageShow = 'Show';
    imageHide = 'Hide'
    filteredProducts: Product[];
    products: Product[];
   // private _productService;
    private _listFilter: string;
    errorMessage: string;

    //declaring private variable and getters-setters
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    /*constructor(productService: ProductService){
        this._productService =  productService;
        this.products = this._productService.getProducts();
        this.filteredProducts=this.products;
         //this.listFilter= 'cart';
    }*/
    //another way defining constructor and inject product service dependency
    constructor(private productservice: ProductService) {}

    //onInit lifecycle hook provide any component initialization
    ngOnInit() {
        // console.log('in OnInIt');
        this.productservice.getProducts().subscribe({
            next: productList => {
                this.products = productList;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
     }

    toggleImage(): void {
        this.showImageFlag = !this.showImageFlag;
    }

    //filter based on product name
    performFilter(filteredBy: string): Product[] {

        return this.products.filter((product: Product) =>
            product.productName.toLocaleLowerCase().indexOf(filteredBy) !== -1);

    }

    onRatingClicked(event:string){
        this.pageTitle = 'Product List '+ event;
    }
}