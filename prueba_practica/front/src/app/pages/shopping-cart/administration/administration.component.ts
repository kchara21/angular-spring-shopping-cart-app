import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductService } from '../service/product.service';
import { ModalAdministrationComponent } from './modal-administration/modal-administration.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent implements OnInit {
  private destroy$ = new Subject<any>();
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'title',
    'price',
    'description',
    'image',
    'category',
    'actions',
  ];
  dataSource = new MatTableDataSource();

  // INYECCION DE DEPENDENCIA
  constructor(private productSvc: ProductService, private _dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  // OBTIENE TODOS LOS PRODUCTOS GUARDADOS EN LA BD
  loadAdministration(): void {
    this.productSvc.getProducts().subscribe({
      next: (products) => {
        this.dataSource.data = products.content;
      },
    });
  }

  // LLAMA AL METODO QUE CARGA LOS PRODUCTOS GUARDADOS EN LA BD
  ngOnInit(): void {
    this.loadAdministration();
  }

  // ABRE UN MODAL PARA VISUALIZAR EL PRODUCTO SELECCIONADO.
  onOpenModalProduct(product = {}) {
    this._dialog
      .open(ModalAdministrationComponent, {
        height: '400px',
        width: '600px',
        hasBackdrop: true,
        data: { title: 'New Product', product },
      })
      .afterClosed()
      .subscribe((res) => {
        this.loadAdministration();
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // ELIMINA UN PRODUCTO RECIBIENDO COMO PARAMETRO SU ID
  onDeleteProduct(productId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir el cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productSvc
          .deleteProduct(productId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            Swal.fire('¡Eliminado!', res?.['message'], 'success');
            this.loadAdministration();
          });
      }
    });
  }
}
