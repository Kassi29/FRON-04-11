import { Component, OnInit } from '@angular/core';
import { categoria } from '../model/categoria';
import { CategoriasService } from 'src/app/categorias/service/categorias.service';

@Component({
  selector: 'app-liscategorias',
  templateUrl: './liscategorias.component.html',
  styleUrls: ['./liscategorias.component.css']
})
export class LiscategoriasComponent implements OnInit {
  categorias: categoria[] = [];
  categorySelected: categoria = new categoria();

  constructor(private service: CategoriasService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.service.findAllCat().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  addCategory(categoria: categoria): void {
    const request = categoria.id ? this.service.updateCat(categoria) : this.service.createCat(categoria);

    request.subscribe(updatedCategory => {
      if (categoria.id) {
        this.categorias = this.categorias.map(cat =>
          cat.id === categoria.id ? { ...updatedCategory } : cat
        );
      } else {
        this.categorias.push(updatedCategory);
      }
      this.resetCategorySelection();
    });
  }

  updateCat(categ: categoria): void {
    this.categorySelected = { ...categ };
  }

  deleteCat(categoria: categoria): void {
    this.service.deleteCat(categoria.id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter(c => c.id !== categoria.id);
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
      }
    });
  }

  resetCategorySelection(): void {
    this.categorySelected = new categoria();
  }
}
