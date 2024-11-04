import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/links/register/model/usuario';
import { ServiceService } from "../../Service/service.service";
import { empresa } from 'src/app/empresa/model/empresa';
import { EmpresaService } from 'src/app/empresa/service/empresa.service';


@Component({
  selector: 'app-adddelivery',
  templateUrl: './adddelivery.component.html',
  styleUrls: ['./adddelivery.component.css']
})
export class AdddeliveryComponent implements  OnInit {

  empresa: empresa[] = [];
  selectedEmpresa: empresa[] = [];

  registerForm: FormGroup;
  usuarios: usuario[] = [];
  emailExistsError = false;
  errorMessage = '';
  passwordVisible = false;



  constructor(private formBuilder: FormBuilder, private router: Router, private service: ServiceService, private empresaService: EmpresaService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      empresa: [[], [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), AdddeliveryComponent.passwordStrengthValidator()]],
    });
  }

  ngOnInit(): void {
    this.loadEmpresa();
  }

  loadEmpresa() {
    this.empresaService.findAllEmp().subscribe(empresa => {
      this.empresa= empresa;
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value };

      // Asegúrate de que solo envías un id de empresa
      const empresaId = this.selectedEmpresa.length > 0 ? this.selectedEmpresa[0].id : null;

      // Verifica si empresaId es válido antes de enviar
      if (empresaId !== null) {
        this.service.createDelivery(formData, empresaId).subscribe({
          next: (newUser) => {
            console.log('Usuario creado:', newUser);
            this.registerForm.reset();
            this.emailExistsError = false;
            this.selectedEmpresa = [];
            this.router.navigateByUrl('/panel/listdeliv');
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
        console.log("Por favor, selecciona una empresa.");
      }
    } else {
      this.registerForm.markAllAsTouched();
      console.log("Por favor, complete todos los campos requeridos.");
    }
  }


  onEmpresaChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement; // Especificar el tipo
      const empresaId = selectElement.value; // Ahora se puede acceder a value sin errores

      const empresa = this.empresa.find(e => e.id === +empresaId);
      if (empresa) {
        this.selectEmpresa(empresa);
      }
    }


    selectEmpresa(empresa: empresa) {
      if (this.selectedEmpresa.length < 2 && !this.selectedEmpresa.includes(empresa)) {
        this.selectedEmpresa.push(empresa);
        this.registerForm.get('empresa')?.setValue(this.selectedEmpresa.map(emp => emp.id));
      }
    }

    removeEmpresa(empresa: empresa) {
      this.selectedEmpresa = this.selectedEmpresa.filter(e => e.id !== empresa.id);
      this.registerForm.get('empresa')?.setValue(this.selectedEmpresa.map(emp => emp.id));
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


