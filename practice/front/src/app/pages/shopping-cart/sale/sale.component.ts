import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { OrderService } from '../service/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
})
export class SaleComponent implements OnInit {
  displayedColumns: string[] = ['client', 'order', 'date'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  @ViewChild(MatSort) sort!: MatSort;
  moment: any = moment;

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // INYECCION DE DEPENDENCIAS
  constructor(private orderSvc: OrderService) {}

  // CARGA TODAS LAS ORDENES REGISTRADAS EN LA BD
  loadOrders(): void {
    this.orderSvc.getOrders().subscribe({
      next: (orders) => {
        console.log('orders->', orders.content);
        this.dataSource.data = orders.content;
      },
      error: (err) => {
        console.log('error->', err.error.message);
      },
    });
  }

  // LLAMA AL METODO "loadOrders"
  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
