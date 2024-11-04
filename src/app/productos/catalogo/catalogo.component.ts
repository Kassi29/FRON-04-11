import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { producto } from '../model/producto';
import { ProductosService } from '../service/productos.service';
import { categoria } from 'src/app/categorias/model/categoria';
import { CategoriasService } from 'src/app/categorias/service/categorias.service';
import { ServiceService } from "../../Service/service.service";
import { usuario } from "../../links/register/model/usuario";
import {CarritoService} from "../../carrito/service/carrito.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos: producto[] = [];
  filteredProductos: producto[] = []; // Para los productos filtrados
  productoSelected: producto = new producto();
  categorias: categoria[] = [];
  selectedQuantity: number = 1; // Cantidad seleccionada
  isModalOpen: boolean = false; // Estado del modal
  dropdownOpen: boolean = false; // Estado del dropdown
  sellers: usuario[] = [];
  selectedSellers: usuario[] = []; // Para almacenar artesanos seleccionados
  selectedCategories: number[] = []; // Para almacenar IDs de categorías seleccionadas



  registerForm: FormGroup;

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private cartService:CarritoService,
    private router: Router

  ) {
    this.registerForm = this.formBuilder.group({
      categoria: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadProductos();
    this.loadCategorias();
    this.loadSellers();
    console.log('Productos en el carrito al iniciar:', this.productos);
  }

  loadProductos(): void {
    this.productosService.findAllPro().subscribe(
      productos => {
        this.productos = productos;
        this.filteredProductos = [...productos]; // Inicialmente, mostrar todos los productos
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  loadCategorias(): void {
    console.log("Cargando categorías...");
    this.categoriasService.findAllCat().subscribe(
      categorias => {
        this.categorias = categorias;
        console.log('Categorías cargadas:', this.categorias);
        if (this.categorias.length > 0) {
          this.registerForm.get('categoria')?.enable();
        }
      },
      error => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  loadSellers(): void {
    this.service.getUsersByRole('ROLE_SELLER').subscribe(
      sellers => {
        this.sellers = sellers;
        console.log('Vendedores cargados:', this.sellers);
      },
      error => {
        console.error('Error al cargar los vendedores:', error);
      }
    );
  }

  showAllProducts(): void {
    this.filteredProductos = [...this.productos]; // Mostrar todos los productos
  }


  resetProductoSelection(): void {
    this.productoSelected = new producto();
    this.selectedQuantity = 1; // Resetear la cantidad al cerrar el modal
  }

  lastCategory(category: { id: number, name: string, description: string }): boolean {
    if (this.productoSelected.categories && this.productoSelected.categories.length > 0) {
      const lastCategory = this.productoSelected.categories[this.productoSelected.categories.length - 1];
      return lastCategory.id === category.id;
    }
    return false;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onCategoryChange(categoriaId: number): void {
    const index = this.selectedCategories.indexOf(categoriaId);
    if (index === -1) {
      this.selectedCategories.push(categoriaId); // Agregar la categoría si no está seleccionada
    } else {
      this.selectedCategories.splice(index, 1); // Eliminar la categoría si ya está seleccionada
    }
    this.filterProducts(); // Filtra los productos cada vez que cambie la selección
  }


  onSellerChange(seller: usuario): void {
    const index = this.selectedSellers.findIndex(s => s.id === seller.id);
    if (index === -1) {
      this.selectedSellers.push(seller); // Agrega el artesano seleccionado
    } else {
      this.selectedSellers.splice(index, 1); // Elimina el artesano si ya estaba seleccionado
    }
    this.filterProducts(); // Filtra los productos cada vez que cambie la selección
  }

  filterProducts(): void {
    this.filteredProductos = this.productos.filter(producto => {
      const categoryMatch = this.selectedCategories.length === 0 ||
        producto.categories.some(cat => this.selectedCategories.includes(cat.id));

      const sellerMatch = this.selectedSellers.length === 0 ||
        this.selectedSellers.some(seller => seller.email === producto.sellerEmail);

      return categoryMatch && sellerMatch; // Retorna verdadero si cumple con ambas condiciones
    });
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.selectedSellers = [];
    this.filteredProductos = [...this.productos]; // Restablecer a todos los productos
  }

  removeCategory(categoryId: number): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
      this.filterProducts(); // Filtra nuevamente después de eliminar
    }
  }

  removeSeller(seller: usuario): void {
    const index = this.selectedSellers.indexOf(seller);
    if (index !== -1) {
      this.selectedSellers.splice(index, 1);
      this.filterProducts(); // Filtra nuevamente después de eliminar
    }
  }
  getCategoryName(categoryId: number): string | undefined {
    const category = this.categorias.find(cat => cat.id === categoryId);
    return category ? category.name : undefined;
  }


  agregarAlCarrito(producto: producto, cantidad: number): void {
    if (cantidad > producto.stock) {
      alert('La cantidad seleccionada excede el stock disponible.');
      return;
    }

    // Agrega este log para ver el estado del carrito antes de agregar
    console.log('Estado del carrito antes de agregar:', this.cartService.getCartProducts());


    this.cartService.addToCart(producto, cantidad);
    console.log('Productos en el carrito después de agregar:', this.cartService.getCartProducts());

    // Cerrar el modal después de agregar al carrito
    this.closeModal();
  }

  irAlCarrito(): void {
    this.router.navigate(['/web2/carrito']); // Ajusta la ruta según tu estructura
  }




  openModal(producto: producto): void {
    this.productoSelected = producto; // Asigna el producto seleccionado
    this.selectedQuantity = 1; // Reinicia la cantidad seleccionada
    this.isModalOpen = true; // Abre el modal
    console.log('Producto seleccionado:', this.productoSelected);
  }

  closeModal(): void {
    this.isModalOpen = false; // Cierra el modal
    this.resetProductoSelection(); // Resetea la selección del producto
  }



}
