import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categories: string[] = ['Electrónica', 'Ropa', 'Alimentos']; // Ejemplo de categorías


}
