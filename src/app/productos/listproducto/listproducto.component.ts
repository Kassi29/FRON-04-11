import { Component, OnInit } from '@angular/core';
import { producto } from '../model/producto';
import { ProductosService } from '../service/productos.service';
import {AuthService} from "../../realAuth/service/auth.service";
import {HttpClient} from "@angular/common/http";
 // Asegúrate de importar el servicio de autenticación

@Component({
  selector: 'app-listproducto',
  templateUrl: './listproducto.component.html',
  styleUrls: ['./listproducto.component.css']
})
export class ListproductoComponent implements OnInit {

  productos: producto[] = [];
  productoSelected: producto = new producto();
  imagenFile: File | null = null;
  previewUrl: string | null = null;


  constructor(private service: ProductosService, private authService: AuthService,private http: HttpClient) {}


  ngOnInit(): void {
    this.loadProductos();
    if (this.productoSelected) {
      this.previewUrl = this.productoSelected.imageUrl; // Asignar la URL existente
    }
  }

  loadProductos(): void {
    const currentUser = this.authService.getCurrentUser();
    console.log('Usuario actual:', currentUser); // Verificar el usuario actual

    if (currentUser && currentUser.id) {
      this.service.findProductsBySeller(currentUser.id).subscribe(
        productos => {
          console.log('Productos obtenidos:', productos); // Verificar los productos obtenidos
          this.productos = productos;

          // Imprimir información sobre las imágenes
          this.productos.forEach(prod => {
            console.log(`Producto: ${prod.name}, ID: ${prod.id}, URL de imagen: ${prod.imageUrl}`);
          });
        },
        error => {
          console.error('Error al cargar productos:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del usuario logueado.');
    }
  }



  lastCategory(category: any): boolean {
    return this.productoSelected.categories &&
      category === this.productoSelected.categories[this.productoSelected.categories.length - 1];
  }



  addProducto(producto: producto): void {
    const request = producto.id
      ? this.service.updatePro(producto, producto.id, this.imagenFile)
      : this.service.createPro(this.convertToFormData(producto));

    request.subscribe(updateProducto => {
      if (producto.id) {
        this.productos = this.productos.map(pro =>
          pro.id === producto.id ? { ...updateProducto } : pro
        );
      } else {
        this.productos.push(updateProducto);
      }
      this.resetProductoSelection();
      this.loadProductos();
    });
  }





  private convertToFormData(producto: producto): FormData {
    const formData = new FormData();
    Object.keys(producto).forEach(key => {
      formData.append(key, (producto as any)[key]);
    });
    return formData;
  }

  updatePro(prod: producto): void {
    this.productoSelected = { ...prod };
  }

  deletePro(producto: producto): void {
    this.service.deletePro(producto.id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== producto.id);
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
      }
    });
    //this.loadProductos();
  }

  resetProductoSelection(): void {
    this.productoSelected = new producto();
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

  removeImage() {
    this.imagenFile = null;
    this.previewUrl = null;
  }
/*
  getUserEmail(sellerId: number): void {
    this.http.get<string>(`/api/seller/${sellerId}`).subscribe(
      email => {
        // Aquí, puedes asignar el correo al producto correspondiente
        const product = this.productos.find(p => p.seller.id === sellerId);
        if (product) {
          product.seller.email = email; // Asegúrate de que el modelo tenga el campo email
        }
      },
      error => {
        console.error('Error al obtener el correo del vendedor:', error);
      }
    );
  }



 */


}
