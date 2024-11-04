import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { categoria } from '../model/categoria';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/categorias/service/categorias.service';

@Component({
  selector: 'app-addcategoria',
  templateUrl: './addcategoria.component.html',
  styleUrls: ['./addcategoria.component.css']
})
export class AddcategoriaComponent implements OnInit{

  registerForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private service: CategoriasService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      // Inicialización, si es necesario
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('Datos del formulario:', JSON.stringify(formData));


      this.service.createCat(formData).subscribe({
        next: (newCategory) => {
          console.log('Categoría creada:', newCategory);
          this.router.navigateByUrl('/panel/listcat'); // Redirigir a la lista de categorías
          this.registerForm.reset(); // Reiniciar el formulario
        },
        error: (error) => {
          console.error('Error al crear categoría:', error);
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo más tarde.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); // Marcar todos los campos como tocados
      this.errorMessage = "Por favor, completa todos los campos requeridos.";



    }
  }

}
