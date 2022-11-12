import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductsComponent } from '../modal-product/modal-products.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;

  // INYECCION DE DEPENDENCIA
  constructor(private _dialog: MatDialog, private productSvc: ProductService) {}

  ngOnInit(): void {}

  // ABRE UN MODAL: PARA VER EL DETALLE DEL PRODUCTO Y, EN CASO DE QUE ACEPTE, AGREGARLO AL CARRITO DEL CLIENTE
  onOpenModalProduct(product = {}): void {
    this._dialog.open(ModalProductsComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: true,
      data: { title: 'Product', product },
    });
  }
}
