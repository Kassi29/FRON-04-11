
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { almacen } from '../model/almacen';
import { AlmacenService } from "../service/almacen.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-lisalmacen',
  templateUrl: './lisalmacen.component.html',
  styleUrls: ['./lisalmacen.component.css']
})
export class LisalmacenComponent implements OnInit, AfterViewInit {
  almacenes: almacen[] = [];
  almacenSelected: almacen = new almacen();
  registerForm: FormGroup;
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  departamentos = [
    { name: 'La Paz', coords: [-16.5000, -68.1193] },
    { name: 'Cochabamba', coords: [-17.3964, -66.1570] },
    { name: 'Santa Cruz', coords: [-17.7840, -63.1822] },
    { name: 'Oruro', coords: [-17.9666, -67.1161] },
    { name: 'Potosí', coords: [-19.5834, -65.7505] },
    { name: 'Chuquisaca', coords: [-19.0363, -65.2615] },
    { name: 'Beni', coords: [-14.8563, -66.0360] },
    { name: 'Pando', coords: [-11.0078, -68.6604] },
    { name: 'Tarija', coords: [-21.5353, -64.7292] }
  ];

  constructor(private service: AlmacenService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      ubicacion: ['', Validators.required],
      departamento: ['', Validators.required],
      latitud: [{ value: '', disabled: true }, Validators.required],
      longitud: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAlmacen();
  }

  ngAfterViewInit(): void {
    // Puedes inicializar el mapa aquí si es necesario
  }

  loadAlmacen(): void {
    this.service.findAllAlmacen().subscribe(almacen => {
      this.almacenes = almacen;
    });
  }

  addAlmacen(): void {
    const almacenData = { ...this.almacenSelected, ...this.registerForm.value };
    if (this.almacenSelected.id) {
      this.service.updateAlmacen(almacenData).subscribe(updatedAlmacen => {
        this.almacenes = this.almacenes.map(alm => alm.id === updatedAlmacen.id ? { ...updatedAlmacen } : alm);
      }, error => {
        console.error('Error al actualizar el almacén', error);
      });
    } else {
      this.service.createAlmacen(almacenData).subscribe(newAlmacen => {
        this.almacenes = [...this.almacenes, { ...newAlmacen }];
      });
    }
    this.resetAlmacenSelection();
  }

  updateAlm(almc: almacen): void {
    this.almacenSelected = { ...almc };
    this.registerForm.patchValue({
      name: this.almacenSelected.name,
      ubicacion: this.almacenSelected.ubicacion,
      departamento: this.almacenSelected.departamento,
      latitud: this.almacenSelected.latitud,
      longitud: this.almacenSelected.longitud
    });

    // Al pasar las coordenadas al mapa
    this.setMapCenterAndMarker(this.almacenSelected.latitud, this.almacenSelected.longitud);
  }

  setMapCenterAndMarker(lat: number, lng: number): void {
    this.registerForm.patchValue({
      latitud: lat,
      longitud: lng
    });
    if (this.mapComponent) {
      this.mapComponent.setMapCenter([lat, lng]); // Llama al método del componente mapa
    }
  }

  onLocationSelected(location: { lat: number, lng: number }) {
    console.log('Coordenadas seleccionadas:', location); // Imprime las coordenadas seleccionadas
    // Actualiza las coordenadas en el formulario y en almacenSelected
    this.registerForm.patchValue({
      latitud: location.lat,
      longitud: location.lng
    });

    this.almacenSelected.latitud = location.lat;
    this.almacenSelected.longitud = location.lng;

    this.setMapCenterAndMarker(location.lat, location.lng);
  }

  onDepartamentoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const departamento = selectElement.value;
    const selected = this.departamentos.find(d => d.name === departamento);

    if (selected) {
      const [lat, lng] = selected.coords;
      this.registerForm.patchValue({
        latitud: lat,
        longitud: lng
      });
      this.setMapCenterAndMarker(lat, lng);
    }
  }


  deleteAlm(almacen: almacen): void {
    this.service.deleteAlmacen(almacen.id).subscribe({
      next: () => {
        this.almacenes = this.almacenes.filter(a => a.id !== almacen.id);
      },
      error: (err) => {
        console.error('Error al eliminar el almacen:', err);
        // Verificamos si el error es el que indica que no se puede eliminar
        if (err.status === 500) {
          alert('No se puede eliminar el almacen porque tiene productos asociados.');
        } else {
          alert('Ocurrió un error al intentar eliminar el almacen. Por favor, intenta nuevamente.');
        }
      }
    });
  }


  resetAlmacenSelection(): void {
    this.almacenSelected = new almacen();
    this.registerForm.reset(); // Resetea el formulario también
  }
}
