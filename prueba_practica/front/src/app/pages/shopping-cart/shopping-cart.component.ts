import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  // COMPONENTE GENERAL DEL CARRITO DE COMPRAS
  // NOTA: LLAMA AL COMPONENTE "CART"
  // ESTA EN OTRO MODULO PARA MANTENER UNA ESTRUCTURA MAS ESCABALBLE
  constructor() {}

  ngOnInit(): void {}
}
