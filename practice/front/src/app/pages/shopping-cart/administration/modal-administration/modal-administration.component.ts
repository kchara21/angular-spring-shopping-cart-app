import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../service/product.service';
import { BaseFormProduct } from '../../../../shared/utils/base-form-product';
import Swal from 'sweetalert2';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal-administration',
  templateUrl: './modal-administration.component.html',
  styleUrls: ['./modal-administration.component.css'],
})
export class ModalAdministrationComponent implements OnInit {
  actionTODO = Action.NEW;

  // INYECCION DE DEPENDENCIA
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productSvc: ProductService,
    public productForm: BaseFormProduct
  ) {}

  // RESETEA LOS INPUTS Y VALIDACIONES DEL FORMULARIO.
  // EN CASO DE EDITAR SE LLAMA AL METODO pathFormData()
  ngOnInit(): void {
    if (this.data?.product.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.pathFormData();
      this.data.title = 'Edit Product';
    } else {
      this.productForm.baseForm.markAsUntouched();
      this.productForm.baseForm.get('title').setValue('');
      this.productForm.baseForm.get('description').setValue('');
      this.productForm.baseForm.get('category').setValue('');
      this.productForm.baseForm.get('image').setValue('');
      this.productForm.baseForm.get('price').setValue('');
      this.productForm.baseForm.updateValueAndValidity();
    }
  }

  // MODAL QUE GUARDA O EDITA UN PRODUCTO.
  // VERIFICA SI VIENE UN ID, DE SER ASI, ENTONCES EDITA EL PRODUCTO CASO CONTRARIO CREA UNO NUEVO
  onSaveProduct(): void {
    const formValue = this.productForm.baseForm.value;
    console.log('formValue', formValue);
    if (this.actionTODO === Action.NEW) {
      this.productSvc.createProduct(formValue).subscribe({
        next: (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto Guardado!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      const productId = this.data?.product?.id;
      this.productSvc.editProduct(productId, formValue).subscribe({
        next: (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto Acualizado!',
            showConfirmButton: false,
            timer: 1000,
          });
        },
        error: (err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
  }

  checkField(field: string): boolean {
    return this.productForm.isValidField(field);
  }

  // SETEO LA INFORMACION EN LOS INPUT DEL FORMULARIO EN CASO DE QUE SE DESEE EDITAR UN PRODUCTO.
  private pathFormData(): void {
    this.productForm.baseForm.patchValue({
      title: this.data?.product?.title,
      price: this.data?.product?.price,
      image: this.data?.product?.image,
      description: this.data?.product?.description,
      category: this.data?.product?.category,
    });
  }
}
