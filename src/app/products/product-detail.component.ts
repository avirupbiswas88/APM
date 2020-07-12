import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string= 'Product Details';
  product: Product;
  errorMessage: string='';

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
   // let id = +this.route.snapshot.paramMap.get('id');
   // this.pageTitle += `: ${id}`;
   const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.grtProduct(id);
    }
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }

  grtProduct(id: number){
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

}
