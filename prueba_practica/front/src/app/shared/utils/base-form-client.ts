import { Injectable } from '@angular/core';
import { AuthService } from '../../pages/auth/service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BaseFormClient {
  errorMessage = null;
  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    client: ['', [Validators.required, Validators.minLength(3)]],
    direction: ['', [Validators.required, Validators.minLength(5)]],
    facturation_name: ['', [Validators.required, Validators.minLength(3)]],
    facturation_direction: ['', [Validators.required, Validators.minLength(5)]],
    paymentMethod: ['', [Validators.required]],
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field)?.touched || this.baseForm.get(field)?.dirty)! &&
      !this.baseForm.get(field)?.valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field)!;
    if (errors) {
      const minLength = errors?.['minlength']?.requiredLength;

      const messages = {
        required: 'Debe ingresar un valor',
        minlength: `Debe tener minimo ${minLength} caracteres`,
      };
      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
