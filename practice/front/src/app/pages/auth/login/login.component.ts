import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { BaseFormUser } from '../../../shared/utils/base-form-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  private _subscription: Subscription = new Subscription();

  // INYECCION DE DEPENDENCIAS
  constructor(
    private _authService: AuthService,
    private _router: Router,
    public _loginForm: BaseFormUser
  ) {}

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  // RESETEO INPUTS Y VALIDACIONES.
  ngOnInit(): void {
    this._loginForm.baseForm.get('email').setValue('');
    this._loginForm.baseForm.get('password').setValue('');
    this._loginForm.baseForm.updateValueAndValidity();
  }

  checkField(field: string): boolean {
    return this._loginForm.isValidField(field);
  }

  // METODO QUE LLAMA AL SERVICIO "AUTH" PARA LA AUTENTICACION.
  onLogin(): void {
    if (this._loginForm.baseForm.invalid) {
      return;
    }
    const formValue = this._loginForm.baseForm.value;
    this._subscription.add(
      this._authService.login(formValue).subscribe({
        next: (auth) => {
          if (auth.token) {
            this._router.navigate(['administration']);
          }
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
        },
      })
    );
  }
}
