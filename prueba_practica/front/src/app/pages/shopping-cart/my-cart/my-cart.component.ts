import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CartDetail } from 'src/app/shared/models/cart.interface';
import { ModalMyCartComponent } from './modal-my-cart/modal-my-cart.component';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  displayedColumns: string[] = ['title', 'amount', 'price', 'total'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  @ViewChild(MatSort) sort!: MatSort;

  productsToBuyShoppingCart: CartDetail[] = [];

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // INYECCION DE DEPENDENCIAS
  constructor(private _dialog: MatDialog) {}

  // DEVUELVE LOS PRODUCTOS AGREGADOS POR EL CLIENTE (DESDE EL LOCAL STORAGE)
  loadProductsInCart(): any {
    return JSON.parse(localStorage.getItem('cart')!) || null;
  }

  // CARGA LOS PRODUCTOS AGREGADOS AL COMPONENTE.
  ngOnInit(): void {
    this.productsToBuyShoppingCart = this.loadProductsInCart();
    if (!this.productsToBuyShoppingCart) return;

    this.dataSource.data = this.loadProductsInCart();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // ABRE UN MODAL: QUE MUESTRA LA FACTURA Y UN RESUMEN DE COMPRA.
  onOpenModalBuy(): void {
    this._dialog
      .open(ModalMyCartComponent, {
        height: '400px',
        width: '600px',
        hasBackdrop: true,
        data: { title: 'Invoice', products: this.productsToBuyShoppingCart },
      })
      .afterClosed()
      .subscribe((res) => {
        this.loadProductsInCart();
      });
  }
}
