import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../service/productos.service';
import { CategoriasService } from 'src/app/categorias/service/categorias.service';
import { categoria } from 'src/app/categorias/model/categoria';
import { AuthService } from "../../realAuth/service/auth.service";
import { AlmacenService } from "../../almacen/service/almacen.service";
import { almacen } from "../../almacen/model/almacen";

@Component({
  selector: 'app-addproducto',
  templateUrl: './addproducto.component.html',
  styleUrls: ['./addproducto.component.css']
})
export class AddproductoComponent implements OnInit {

  categorias: categoria[] = [];
  selectedCategorias: categoria[] = [];

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  imagenFile: File | null = null;
  previewUrl: string | null = null;

  almacenes: almacen[] = [];
  selectedAlmacen: almacen[] = []; // Inicializado correctamente

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ProductosService,
    private categoriasService: CategoriasService,
    private authService: AuthService,
    private almacenService: AlmacenService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      categoria: [{ value: [], disabled: true }, [Validators.required]], // Inicialmente deshabilitado
      stock: ['', [Validators.required, noNegativeNumberValidator()]],
      precio: ['', [Validators.required, noNegativeNumberValidator()]],
      imagenUrl: [null],
      almacen: [{ value: [], disabled: true }, [Validators.required]] // Inicialmente deshabilitado
    });
  }

  ngOnInit(): void {
    this.loadCategorias(); // Cargar categorías al inicializar
    this.loadAlmacen();
  }

  loadCategorias() {
    console.log("Cargando categorías...");
    this.categoriasService.findAllCat().subscribe(categorias => {
      this.categorias = categorias;
      console.log('Categorías cargadas:', this.categorias);
      // Habilitar el control de categoría si hay categorías disponibles
      if (this.categorias.length > 0) {
        this.registerForm.get('categoria')?.enable();
      }
    }, error => {
      console.error('Error al cargar categorías:', error);
    });
  }



  loadAlmacen(): void {
    this.almacenService.findAllAlmacen().subscribe(almacen => {
      this.almacenes = almacen;
      console.log('Almacenes cargados:', this.almacenes);
      // Habilitar el control de almacén si hay almacenes disponibles
      if (this.almacenes.length > 0) {
        this.registerForm.get('almacen')?.enable();
      }
    }, error => {
      console.error('Error al cargar almacenes:', error);
    });
  }


  onSubmit() {
    console.log("Apretaste el boton");
    console.log('Valores del formulario:', this.registerForm.value);
    console.log('Formulario válido:', this.registerForm.valid);

    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('file', this.imagenFile as Blob);
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('description', this.registerForm.get('descripcion')?.value);
      formData.append('stock', this.registerForm.get('stock')?.value.toString());
      formData.append('price', this.registerForm.get('precio')?.value.toString());

      // Agregar categorías seleccionadas
      this.selectedCategorias.forEach(cat => {
        formData.append('categories', cat.id.toString()); // Cambiado aquí
      });

      // Enviar ID de almacén
      if (this.selectedAlmacen.length > 0) {
        formData.append('almacen', this.selectedAlmacen[0].id.toString()); // Cambiado aquí
      }

      // Obtener el usuario actual
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.id) {
        formData.append('seller', currentUser.id.toString());
      } else {
        console.error('No se encontró el ID del usuario logueado.');
        return;
      }

      // Registro para depuración
      formData.forEach((value, key) => {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      });

      // Enviar el producto a la API
      this.service.createPro(formData).subscribe({
        next: (newProducto) => {
          console.log('Producto creado:', newProducto);
          this.successMessage = 'Producto agregado exitosamente.';
          this.registerForm.reset();
          this.imagenFile = null;
          this.selectedCategorias = [];
          this.selectedAlmacen = [];
          this.previewUrl = null;

          //this.loadProductos();
          this.router.navigateByUrl('/artesano/listpro');
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo más tarde.';
        }
      });
    } else {
      console.error('El formulario no es válido:', this.registerForm.errors);
      // Imprimir errores específicos de cada control
      Object.keys(this.registerForm.controls).forEach(key => {
        const controlErrors = this.registerForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errores en ${key}:`, controlErrors);
        }
      });
    }
  }



  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    } else {
      alert('Por favor selecciona un archivo JPG');
      event.target.value = null;
    }
  }


  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = selectElement.value;
    console.log('Categoría seleccionada:', categoryId); // Verifica el ID de la categoría seleccionada

    const category = this.categorias.find(c => c.id === +categoryId);
    if (category) {
      this.selectCategory(category);
    }
  }


  selectCategory(category: categoria) {
    if (this.selectedCategorias.length < 2 && !this.selectedCategorias.includes(category)) {
      this.selectedCategorias.push(category);
      this.registerForm.get('categoria')?.setValue(this.selectedCategorias.map(cat => cat.id));
    }
  }


  removeCategory(category: categoria) {
    this.selectedCategorias = this.selectedCategorias.filter(c => c.id !== category.id);
    this.registerForm.get('categoria')?.setValue(this.selectedCategorias.map(cat => cat.id));
  }

  onAlmacenChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const almacenId = selectElement.value;

    const almacen = this.almacenes.find(a => a.id === +almacenId);
    if (almacen) {
      this.selectAlmacen(almacen);
    }
  }

  selectAlmacen(almacen: almacen) {
    if (this.selectedAlmacen.length < 2 && !this.selectedAlmacen.includes(almacen)) {
      this.selectedAlmacen.push(almacen);
      this.registerForm.get('almacen')?.setValue(this.selectedAlmacen.map(alm => alm.id));
      console.log('Almacén seleccionado:', almacen); // Agregado para depuración
    }
  }

  removeAlmacen(almacen: almacen) {
    this.selectedAlmacen = this.selectedAlmacen.filter(a => a.id !== almacen.id);
    this.registerForm.get('almacen')?.setValue(this.selectedAlmacen.map(alm => alm.id));
    console.log('Almacén eliminado:', almacen); // Agregado para depuración
  }

  removeImage() {
    this.imagenFile = null;
    this.previewUrl = null;
    this.registerForm.get('imagen')?.setErrors({ required: true });
  }
}

export function noNegativeNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined) {
      return null; // No se puede validar si no hay valor
    }

    const numericValue = Number(value);
    const isNumber = !isNaN(numericValue);

    return isNumber && numericValue <= 0 ? { negative: true } :
      !isNumber ? { notANumber: true } :
      null;
  };
}
