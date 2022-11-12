import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  allProducts: any[] = [];
  term: string = '';

  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  @ViewChild(MatSort) sort!: MatSort;

  // INYECCION DE DEPENDENCIA
  constructor(private productSvc: ProductService) {}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // LLAMA AL SERVICIO PARA OBTENER LOS PRODUCTOS REGISTRADOS EN LA BASE DE DATOS
  loadProducts(): void {
    this.productSvc.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products.content;
      },
    });
  }

  // CARGA TODOS LOS PRODUCTOS REGISTRADOS EN LA BASE DE DATOS
  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
