import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/links/register/model/usuario';
import { ServiceService } from "../../Service/service.service";
import { comunidad } from "../../comunidad/model/comunidad";
import { ComunidadService } from "../../comunidad/service/comunidad.service";

@Component({
  selector: 'app-addartesanos',
  templateUrl: './addartesanos.component.html',
  styleUrls: ['./addartesanos.component.css']
})
export class AddartesanosComponent implements OnInit {
  registerForm: FormGroup;
  usuarios: usuario[] = [];
  emailExistsError = false;
  errorMessage = '';
  passwordVisible = false;

  comunidad: comunidad[] = [];
  selectedComunidad: comunidad | null = null;  // Cambiado a null en lugar de un array

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ServiceService,
    private comunidadService: ComunidadService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      comunidad: ['', [Validators.required]],  // Correcto
      password: ['', [Validators.required, Validators.minLength(8), AddartesanosComponent.passwordStrengthValidator()]],
    });
  }

  ngOnInit(): void {
    this.loadComunidad();
    this.registerForm.get('comunidad')?.valueChanges.subscribe(value => {
      this.selectedComunidad = this.comunidad.find(com => com.id === value) || null;
      console.log("Valor recibido:", value);  // Imprimir el valor recibido
      console.log("Comunidad seleccionada:", this.selectedComunidad);  // Verifica la comunidad seleccionada
    });
  }


  loadComunidad() {
    this.comunidadService.findAllCom().subscribe(comunidad => {
      this.comunidad = comunidad;
      console.log("Comunidades cargadas:", this.comunidad);

      // Imprimir cada comunidad y su tipo de ID
      this.comunidad.forEach(com => {
        console.log("ID de comunidad:", com.id, "Tipo:", typeof com.id);  // Verifica el tipo de id
        console.log("Nombre de comunidad:", com.name);
      });
    });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('ID de comunidad:', formData.comunidad);
      console.log('Datos del usuario:', JSON.stringify(formData, null, 2));
      console.log(this.selectedComunidad);

      const comunidadId = this.registerForm.get('comunidad')?.value;

      console.log("Imprimo la const " + comunidadId);
      if (comunidadId !== null) {
        // Enviar el formulario al backend
        this.service.createArtesano(formData, comunidadId).subscribe({
          next: (newUser) => {
            console.log('Usuario creado:', newUser);
            this.registerForm.reset();
            this.emailExistsError = false;
            this.router.navigateByUrl('/panel/listart');
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
        console.log("Por favor, selecciona una comunidad.");
        this.errorMessage = "Por favor, selecciona una comunidad.";
      }
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
