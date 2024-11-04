import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { comunidad } from '../model/comunidad';
import { Router } from '@angular/router';
import { ComunidadService } from '../service/comunidad.service';

@Component({
  selector: 'app-addcomunidad',
  templateUrl: './addcomunidad.component.html',
  styleUrls: ['./addcomunidad.component.css']
})

export class AddcomunidadComponent implements OnInit{

  registerForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ComunidadService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Inicialización, si es necesario
  } 
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('Datos del formulario:', JSON.stringify(formData));


      this.service.createCom(formData).subscribe({
        next: (newCommunity) => {
          console.log('Comunidad creada:', newCommunity);
          this.router.navigateByUrl('/panel/listcom'); // Redirigir a la lista de categorías
          this.registerForm.reset(); // Reiniciar el formulario
        },
        error: (error) => {
          console.error('Error al crear comunidad:', error);
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo más tarde.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); // Marcar todos los campos como tocados
      this.errorMessage = "Por favor, completa todos los campos requeridos.";
    }
  }
}
