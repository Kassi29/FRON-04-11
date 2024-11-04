import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from "../../Service/service.service";
import {AuthService} from "../../realAuth/service/auth.service";
 // Importa tu servicio de autenticación

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';
  passwordVisible = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ServiceService, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), PasswordComponent.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validators: PasswordComponent.passwordMatchValidator });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const currentUser = this.authService.getCurrentUser(); // Obtener el usuario actual

      if (currentUser && currentUser.email) { // Verifica que currentUser y su email no sean null
        const formData = {
          userId: currentUser.id, // Agrega el ID del usuario
          email: currentUser.email,
          currentPassword: this.registerForm.value.currentPassword,
          newPassword: this.registerForm.value.newPassword,
          repeatNewPassword: this.registerForm.value.confirmPassword
        };

        const token = this.authService.getToken(); // Método para obtener el token

        if (token) { // Verifica que el token no sea null
          console.log('Datos a enviar:', formData);

          this.service.changePassword(formData, token).subscribe(
            response => {
              console.log('Contraseña cambiada con éxito', response);
            },
            error => {
              console.error('Error al cambiar la contraseña', error);
            }
          );
        } else {
          console.error('No se encontró el token.');
        }
      } else {
        console.error('No se encontró el usuario actual o su email.');
      }
    }
  }




  // Validador personalizado para la contraseña
  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const valid = hasUpperCase && hasSpecialChar;

      return !valid ? { passwordStrength: true } : null;
    };
  }

  // Validador personalizado para asegurar que las contraseñas coincidan
  static passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
