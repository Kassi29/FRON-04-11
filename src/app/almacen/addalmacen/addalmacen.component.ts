import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlmacenService} from 'src/app/almacen/service/almacen.service';
import * as L from 'leaflet';
import {MapComponent} from '../map/map.component';
import {EmpresaService} from "../../empresa/service/empresa.service";

@Component({
  selector: 'app-addalmacen',
  templateUrl: './addalmacen.component.html',
  styleUrls: ['./addalmacen.component.css']
})
export class AddalmacenComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';
  mapCenter: L.LatLngTuple = [-16.5000, -68.1193]; // Coordenadas por defecto (La Paz)

  empresas: any[] = []; // Propiedad para almacenar empresas
  selectedEmpresa: any[] = []; // Propiedad para empresas seleccionadas

  departamentos = [
    {name: 'La Paz', coords: [-16.5000, -68.1193]},
    {name: 'Cochabamba', coords: [-17.3964, -66.1570]},
    {name: 'Santa Cruz', coords: [-17.7840, -63.1822]},
    {name: 'Oruro', coords: [-17.9666, -67.1161]},
    {name: 'Potosí', coords: [-19.5834, -65.7505]},
    {name: 'Chuquisaca', coords: [-19.0363, -65.2615]},
    {name: 'Beni', coords: [-14.8563, -66.0360]},
    {name: 'Pando', coords: [-11.0078, -68.6604]},
    {name: 'Tarija', coords: [-21.5353, -64.7292]}
  ];

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AlmacenService,
    private empresaService: EmpresaService // Asegúrate de inyectar el servicio
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      latitud: [0, [Validators.required]],
      longitud: [0, [Validators.required]],
      empresa: ['', [Validators.required]] // Añade el control para empresa
    });
  }


  onDepartamentoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const departamento = selectElement.value;
    const selected = this.departamentos.find(d => d.name === departamento);
    if (selected) {
      this.mapCenter = selected.coords as L.LatLngTuple;
      this.mapComponent.setMapCenter(this.mapCenter);
    }
  }

  onLocationSelected(lat: number, lng: number): void {
    console.log('Latitud:', lat, 'Longitud:', lng); // Verifica que se reciban correctamente
    this.registerForm.patchValue({
      latitud: lat,
      longitud: lng
    });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Enviar la empresa como un objeto
      const empresaId = formData.empresa; // Obtén el ID de la empresa
      formData.empresa = { id: empresaId }; // Envía como objeto

      // Imprimir el JSON que se enviará al backend
      console.log('Datos a enviar al backend (JSON):', JSON.stringify(formData, null, 2));

      this.service.createAlmacen(formData).subscribe({
        next: (newAlmacen) => {
          console.log('Almacén creado: ', newAlmacen);
          this.router.navigateByUrl('/panel/listalm');
          this.selectedEmpresa = [];
          this.registerForm.reset();
        },
        error: (error) => {
          console.error('Error al crear almacén:', error);
          this.errorMessage = 'Ocurrió un error. Intenta de nuevo más tarde.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.errorMessage = "Por favor, completa todos los campos requeridos.";
    }
  }

  ngOnInit(): void {
    this.loadEmpresas(); // Carga las empresas al inicializar
  }

  loadEmpresas(): void {
    this.empresaService.findAllEmp().subscribe(empresa => {
      this.empresas = empresa;
    });
  }

  onEmpresaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const empresaId = selectElement.value;
    const selected = this.empresas.find(e => e.id === empresaId);
    if (selected) {
      this.selectedEmpresa.push(selected); // Añade la empresa seleccionada
      this.registerForm.patchValue({ empresa: selected.id });
    }
  }

  removeEmpresa(empresa: any): void {
    this.selectedEmpresa = this.selectedEmpresa.filter(e => e.id !== empresa.id);
    // Puedes hacer algo adicional aquí si es necesario
  }

}
