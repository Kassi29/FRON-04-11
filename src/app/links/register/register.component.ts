import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from './model/usuario';
import { ServiceService } from "../../Service/service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      password: ['', [Validators.required, Validators.minLength(8), RegisterComponent.passwordStrengthValidator()]],
      roles: this.formBuilder.group({
        ROLE_BUYER: [false],
        ROLE_SELLER: [false],
        ROLE_DELIVERY: [false]
      }, { validators: RegisterComponent.atLeastOneRoleSelected })
    });
  }

  ngOnInit(): void {

  }

  @Output() newUserEvent = new EventEmitter<usuario>();

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Transformar los roles a la estructura esperada
      const roles = [];
      if (formData.roles.ROLE_BUYER) {
        roles.push({ name: 'ROLE_BUYER' });
      }
      if (formData.roles.ROLE_SELLER) {
        roles.push({ name: 'ROLE_SELLER' });
      }
      if (formData.roles.ROLE_DELIVERY) {
        roles.push({ name: 'ROLE_DELIVERY' });
      }

      // Actualizar el formData con el array de roles
      formData.roles = roles;

      console.log('Datos del usuario:', JSON.stringify(formData, null, 2));

      // Enviar el formulario al backend
      this.service.create(formData).subscribe({
        next: (newUser) => {
          console.log('Usuario creado:', newUser);
          this.router.navigateByUrl('/web/login');
          this.registerForm.reset();
          this.emailExistsError = false;
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

  // Validador personalizado para asegurar que al menos un rol esté seleccionado
  static atLeastOneRoleSelected(group: FormGroup): { [key: string]: boolean } | null {
    const controls = group.controls;
    const isAtLeastOneChecked = controls['ROLE_BUYER'].value || controls['ROLE_SELLER'].value || controls['ROLE_DELIVERY'].value;
    return isAtLeastOneChecked ? null : { 'noRoleSelected': true };
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
