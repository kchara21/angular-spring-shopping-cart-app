# Shopping Cart | Kaleb Chara Toala

<p align="center">
 <img src="https://www.vectorlogo.zone/logos/springio/springio-ar21.svg" height="100" alt="Spring Boot" />
 <img src="https://www.vectorlogo.zone/logos/angular/angular-ar21.svg" height="110" alt="Angular Logo" />
</p>

## Description

Shopping Cart, pagina web donde un "cliente" puede generar compras, y un "administrador" gestionar los productos.

## Technologies

Server:

- Java v17
- Spring Boot v2.7.4
- MySQL
- JPA
- I/O Validation

Client:

- Angular v13.3.0
- TypeScript
- Angular Material
- CSS
- Reactive Forms
- Others technologies of angular's ecosystem

## Installation

Server:

- Estar seguro de que el proyecto tenga las siguientes dependencias en el pom.xml: Spring Web, MySQL Driver, Spring Data JPA, Spring Boot DevTools, I/O Validation, Model Mapper.

- En el archivo "application.properties" especificar: El nombre de la DB asi como el username y password.

- Inicializar el servidor...

- Nota: Las tablas de la BD se cargan por defecto gracias a JPA y su persistencia de datos. Y considerar que se debe ubicar en el siguiente apartado el puerto disponible, con el cual se levantará el frontend. Para este caso, será 4200, usar el disponible en su caso:

![home](screenshots/back/configuration_back.png)

Client:

- Correr 'npm i' para instalar todas las dependencias del proyecto.

- Correr 'ng serve' para inicializar la aplicacion...

## Use

Server:

- En POSTMAN crear al usuario administrador de la siguiente forma:

![home](screenshots/back/auth_register.png)

- En POSTMAN cargar los datos de la API de la siguiente forma:

![home](screenshots/back/upload_api.png)

Client:

### Shopping Page (http://localhost:4200/)

En este apartado se muestran todos los productos disponibles.

![home](screenshots/front/principal.png)

### Product to Add Modal

En este apartado el cliente puede escoger la cantidad del producto seleccionado.

![home](screenshots/front/selecting_product.png)

### My Car Page (http://localhost:4200/cart)

En este apartado el cliente puede ver el resumen de los productos agregados a su carrito.

![home](screenshots/front/my_cart.png)

### Invoice Modal

En este apartado el cliente registra la informacion para la factura y procesa la compra.

![home](screenshots/front/invoice.png)

Se genera el numero de orden.

![home](screenshots/front/purchase_successful.png)

### Admin | Login Page (http://localhost:4200/login)

En este apartado el usuario previamente registrado inicia sesion. Y tiene acceso a dos modulos mas.

![home](screenshots/front/login.png)

#### Admin | Administration Page (http://localhost:4200/administration)

En este apartado el administador gestiona los productos existentes, puede crear, editar o remover un producto.

![home](screenshots/front/administration.png)

#### Admin | Administration Page (http://localhost:4200/sales)

En este apartado el administrador puede ver el resumen de las ordenes generadas.

![home](screenshots/front/sales.png)

## Support

De tener alguna duda o recomendacion, no dudar en contactarme:

- email: kalebdavidchara@hotmail.com
- celular: 0960609798

## License

Desarrollado por Kaleb David Chara Toala.
