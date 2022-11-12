import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CartDetail } from '../../../../shared/models/cart.interface';

@Component({
  selector: 'app-modal-products',
  templateUrl: './modal-products.component.html',
  styleUrls: ['./modal-products.component.css'],
})
export class ModalProductsComponent implements OnInit {
  product;
  amountProductToAdd = new FormControl('', [Validators.required]);

  // INYECCION DE DEPENDENCIA
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  // CARGA EN EL MODAL LA INFORMACION DEL PRODUCTO SELECCIONADO.
  ngOnInit(): void {
    this.product = this.data.product;
  }

  // GUARDA EN EL LOCAL STORAGE LOS PRODUCTOS SELECCIONADOS POR EL CLIENTE
  onSaveProduct(): void {
    let productToAdd: CartDetail[] = [];
    const cartProducts: CartDetail[] =
      JSON.parse(localStorage.getItem('cart')!) || null;

    // SI NO EXISTE AUN EN EL LOCAL STORAGE EL "CARRITO" ENTONCES LLENO POR 1RA VEZ UN PRODUCTO AHI.
    if (!cartProducts) {
      productToAdd.push({
        title: this.data.product.title,
        amount: this.amountProductToAdd.value,
        price: this.data.product.price,
        total: this.amountProductToAdd.value * this.data.product.price,
      });

      localStorage.setItem('cart', JSON.stringify(productToAdd));
    } else {
      // SI ES QUE YA EXISTE SE ACTUALIZA LA CANTIDAD Y EL TOTAL A PAGAR DE ESE PRODUCTO
      cartProducts.forEach((product) => {
        if (product.title == this.data.product.title) {
          const actualAmount: number =
            parseInt(this.amountProductToAdd.value) +
            parseInt(product.amount.toString());
          product.amount = actualAmount;
          product.total = product.price * product.amount;
          productToAdd.push(product);

          return localStorage.setItem('cart', JSON.stringify(productToAdd));
        }
      });
      //ACTUALIZO MI OBJETO CON LOS PRODUCTOS ACTUALES DEL CARRITO
      productToAdd = cartProducts;

      // BUSCO SI EL PRODUCTO A AGREGAR YA ESTA EN EL CARRITO
      const productAlreadyInCar = productToAdd.filter(
        (product) => product.title === this.data.product.title
      );

      // SI NO EXISTE EN EL CARRITO LO AGREGO, PORQUE SERIA UN PRODUCTO NUEVO.
      if (productAlreadyInCar.length < 1) {
        const newProduct: CartDetail = {
          amount: this.amountProductToAdd.value,
          price: this.data.product.price,
          title: this.data.product.title,
          total: this.amountProductToAdd.value * this.data.product.price,
        };
        productToAdd.push(newProduct);
        localStorage.setItem('cart', JSON.stringify(productToAdd));
      }

      // SETEO LOCAL STORAGE
      localStorage.setItem('cart', JSON.stringify(productToAdd));
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product Added!',
      showConfirmButton: false,
      timer: 1000,
    });
  }
}
