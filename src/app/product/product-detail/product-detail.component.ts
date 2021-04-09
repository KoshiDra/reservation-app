import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: JSON;

  constructor(
    private route: ActivatedRoute,
    private productServece: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const productObservable =  this.productServece.getProductById(params.get('productId'));

      productObservable.subscribe(
        (data) => {
          this.product = data;
        },
        (err) => {
          console.error('something wrong occurred: ' + err);
        },
        () => {console.log('done');}
      );
    });
  }

}
