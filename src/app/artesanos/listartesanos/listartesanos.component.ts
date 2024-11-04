import { Component, OnInit } from '@angular/core';
import { artesanoService } from '../service/artesano.service';
import { sellerDTO } from "../model/SellerDto";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comunidad } from "../../comunidad/model/comunidad";
import { ComunidadService } from "../../comunidad/service/comunidad.service";

@Component({
  selector: 'app-listartesanos',
  templateUrl: './listartesanos.component.html',
  styleUrls: ['./listartesanos.component.css']
})
export class ListartesanosComponent implements OnInit {
  artesanos: sellerDTO[] = [];
  isCreatingArtesano: boolean = false;
  selectedArtesano: sellerDTO | null = null;
  editForm: FormGroup;
  isEditMode: boolean = false;
  comunidades: comunidad[] = []; // Cambiado de comunidad a comunidades

  constructor(
    private artesanoService: artesanoService,
    private formBuilder: FormBuilder,
    private comunidadService: ComunidadService // Inyectar el servicio de comunidades
  ) {
    this.editForm = this.formBuilder.group({
      comunidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchArtesano();
    this.loadComunidades(); // Cargar comunidades al iniciar
  }

  fetchArtesano(): void {
    this.artesanoService.getArtesano().subscribe(
      (data: sellerDTO[]) => {
        this.artesanos = data;
        console.log('Artesanos obtenidos:', this.artesanos);
      },
      (error) => {
        console.error('Error fetching artesanos', error);
      }
    );
  }

  loadComunidades(): void { // Método para cargar comunidades
    this.comunidadService.findAllCom().subscribe(comunidades => {
      this.comunidades = comunidades;
      console.log("Comunidades cargadas:", this.comunidades);
    }, error => {
      console.error('Error al cargar comunidades', error);
    });
  }

  deleteArtesano(artesano: sellerDTO) {
    console.log('ID del artesano a eliminar:', artesano.user.id);

    if (confirm('¿Estás seguro de que deseas eliminar este artesano?')) {
      this.artesanoService.deleteArtesano(artesano.user.id).subscribe(() => {
        this.artesanos = this.artesanos.filter(a => a.user.id !== artesano.user.id);
        alert('Artesano eliminado con éxito');
      }, error => {
        alert('Error al eliminar el artesano');
        console.error(error);
      });
    }
  }

  getComunidadName(comunidad: any): string {
    return comunidad ? comunidad.name : 'Sin Comunidad';
  }

  editArtesano(artesano: sellerDTO) {
    this.selectedArtesano = artesano;
    this.editForm.patchValue({
      comunidad: artesano.comunidad.id
    });
    this.isEditMode = true;

    console.log('Artesano seleccionado:', this.selectedArtesano);
  }

  updateComunidad() {
    if (this.editForm.valid && this.selectedArtesano) {
      const updatedComunidadId = this.editForm.value.comunidad;
      const artesanoRoleId = this.selectedArtesano.sellerRoleId;

      console.log('ID del artesano a actualizar:', artesanoRoleId);

      if (artesanoRoleId === undefined) {
        console.error('artesanoRoleId es undefined. Verifica el objeto selectedArtesano:', this.selectedArtesano);
        return;
      }

      const updatedArtesano = {
        ...this.selectedArtesano,
        comunidad: {
          id: updatedComunidadId,
          name: this.selectedArtesano.comunidad.name,
          location: this.selectedArtesano.comunidad.location
        }
      };

      this.artesanoService.update(artesanoRoleId, updatedArtesano).subscribe(() => {
        alert('Comunidad actualizada con éxito');
        this.editForm.reset();
        this.isEditMode = false;
        this.selectedArtesano = null;
        this.fetchArtesano(); // Re-fetch artesanos para obtener los datos actualizados
      }, error => {
        console.error('Error al actualizar la comunidad', error);
      });
    } else {
      console.error('Formulario inválido o artesano no seleccionado');
    }
  }



}
