import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/links/register/model/usuario';
import { ServiceService } from "../../Service/service.service";

@Component({
  selector: 'app-addadministrador',
  templateUrl: './addadministrador.component.html',
  styleUrls: ['./addadministrador.component.css']
})
export class AddadministradorComponent  implements  OnInit {
  registerForm: FormGroup;
  usuarios: usuario[] = [];
  emailExistsError = false;
  errorMessage = '';
  passwordVisible = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ServiceService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), AddadministradorComponent.passwordStrengthValidator()]],
    });
  }

  ngOnInit(): void {

  }



  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('Datos del usuario:', JSON.stringify(formData, null, 2));

      // Enviar el formulario al backend
      this.service.createAdmin(formData).subscribe({
        next: (newUser) => {
          console.log('Usuario creado:', newUser);
          this.registerForm.reset();
          this.emailExistsError = false;
          this.router.navigateByUrl('/panel/userss');
        },
        error: (error) => {
          if (error.status === 400) {
            console.error('Error: El email ya existe.');
            this.emailExistsError = true;
            this.errorMessage = 'El email ya existe. Por favor, utiliza otro.';
          } else {
            console.error('Error inesperado:', error);
            this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo más tarde.';
          }
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      console.log("Por favor, complete todos los campos requeridos.");
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

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
