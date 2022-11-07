import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartDetail } from '../../../../shared/models/cart.interface';
import { BaseFormClient } from '../../../../shared/utils/base-form-client';
import { SaleService } from '../../service/sale.service';

@Component({
  selector: 'app-modal-my-cart',
  templateUrl: './modal-my-cart.component.html',
  styleUrls: ['./modal-my-cart.component.css'],
})
export class ModalMyCartComponent implements OnInit {
  shoppingCart: CartDetail[];
  subtotal: number;
  taxe: number;
  total: number;
  paymentMethod = ['Effective', 'Credit Card', 'Wire Transfer'];

  clientShoppingCart = new FormControl('', [Validators.required]);

  // INYECCION DE DEPENDENCIAS
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public clientForm: BaseFormClient,
    private saleSvc: SaleService,
    private _router: Router
  ) {}

  // CALCULA EL SUBTOTAL A PAGAR DEL CARRITO DE PRODUCTOS ESCOGIDOS POR EL CLIENTE.
  calculateSubtotalShoppingCart(shoppingCart: CartDetail[]): number {
    let subtotal: number = 0;
    shoppingCart.map((product) => {
      subtotal = subtotal + product.total;
    });
    return subtotal;
  }

  // CALCULA EL IMPUESTO A PAGAR DEL SUBTOTAL
  calculateTaxes(subtotal: number): number {
    const taxe = (subtotal * 12) / 100;
    return taxe;
  }

  // RESETEA INPUTS Y VALIDACIONES DE LA FACTURA A LLENAR
  // CARGA EL SUBTOTAL, IMPUESTO A PAGAR, Y TOTAL PARA SER MOSTRADO.
  ngOnInit(): void {
    this.clientForm.baseForm.markAsUntouched();
    this.clientForm.baseForm.get('client').setValue('');
    this.clientForm.baseForm.get('direction').setValue('');
    this.clientForm.baseForm.get('facturation_name').setValue('');
    this.clientForm.baseForm.get('facturation_direction').setValue('');
    this.clientForm.baseForm.get('paymentMethod').setValue('');
    this.clientForm.baseForm.updateValueAndValidity();

    this.shoppingCart = this.data.products;
    this.subtotal = Number(
      this.calculateSubtotalShoppingCart(this.shoppingCart).toFixed(2)
    );
    this.taxe = Number(this.calculateTaxes(this.subtotal).toFixed(2));
    this.total = this.subtotal + this.taxe;
  }

  // PAGO DE LA FACTURA, SE GENERA UNA ORDEN Y SE GUARDA EN LA BD.
  onBuyProduct(): void {
    const client = { client: this.clientForm.baseForm.value.client };

    this.saleSvc.createSale(client).subscribe({
      next: (res) => {
        console.log('order', res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Your purchase was successful! With the order: ${res.orderNumber}`,
          showConfirmButton: true,
        }).then((result) => {
          localStorage.removeItem('cart');
          this._router.navigate(['']);
        });
      },
      error: (err) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }

  checkField(field: string): boolean {
    return this.clientForm.isValidField(field);
  }
}
