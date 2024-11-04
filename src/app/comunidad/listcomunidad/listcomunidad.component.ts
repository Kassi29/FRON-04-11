import { Component, OnInit } from '@angular/core';
import { comunidad } from '../model/comunidad';
import { ComunidadService } from '../service/comunidad.service';

@Component({
  selector: 'app-listcomunidad',
  templateUrl: './listcomunidad.component.html',
  styleUrls: ['./listcomunidad.component.css']
})
export class ListcomunidadComponent implements OnInit{

  comunidad: comunidad[] = [];
  communitySelected: comunidad = new comunidad();

  constructor(private service: ComunidadService){}

  ngOnInit(): void {
    this.loadCommunities();
  }

  loadCommunities(): void {
    this.service.findAllCom().subscribe(comunidad => {
      this.comunidad = comunidad;
    });
  }

  addCommunity(comunidad: comunidad): void {
    const request = comunidad.id ? this.service.updateCom(comunidad) : this.service.createCom(comunidad);

    request.subscribe(updateCommunity => {
      if (comunidad.id) {
        this.comunidad = this.comunidad.map(com =>
          com.id === comunidad.id ? { ...updateCommunity } : com
        );
      } else {
        this.comunidad.push(updateCommunity);
      }
      this.resetCommunitySelection();
    });
  }

  updateCom(comun: comunidad): void {
    this.communitySelected = { ...comun};
  }

  deleteCom(community: comunidad): void {
    this.service.deleteCom(community.id).subscribe({
      next: () => {
        this.comunidad = this.comunidad.filter(c => c.id !== community.id);
      },
      error: (err) => {
        console.error('Error al eliminar comunidad:', err);
      }
    });
  }

  resetCommunitySelection(): void {
    this.communitySelected = new comunidad();
  }
}
