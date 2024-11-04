import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CarritoService } from "../carrito/service/carrito.service";
import { AuthService } from "../realAuth/service/auth.service";
import {Router} from "@angular/router";
import { Carrito } from "src/app/carrito/model/carrito";
import {MapComponent} from "../almacen/map/map.component";
import * as L from "leaflet";
import {EmpresaService} from "../empresa/service/empresa.service";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  registerForm: FormGroup;
  qrCodeUrl: string | null = null;
  selectedDeliveryOption: string = 'store'; // Opción por defecto
  showDeliveryOptions: boolean = false; // Estado para mostrar/ocultar datos de entrega
  totalCost: number | null = null; // Propiedad para el total
  mapCenter: L.LatLngTuple = [-16.5000, -68.1193];
  deliveries: any[] = [];
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
  empresas: any[] = []; // Propiedad para almacenar empresas
  selectedEmpresa: any[] = []; // Propiedad para empresas seleccionadas
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  constructor(
    private formBuilder: FormBuilder,
    protected cartService: CarritoService,
    private authService: AuthService,
    private router: Router,
    private empresaService: EmpresaService,
    private service: ServiceService,
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required], // Campo de nombre
      nit: ['', Validators.required], // Campo de NIT/CI
      departamento: ['La Paz', Validators.required], // Inicializar con La Paz
      latitud: ['-16.5000', Validators.required], // Inicializar con latitud de La Paz
      longitud: ['-68.1193', Validators.required], // Inicializar con longitud de La Paz
      empresa: [null, Validators.required], // Campo de empresa
      delivery: [null, Validators.required], // Campo de delivery
      horario: [null, Validators.required],
      deliveryEmail: [''],
      totalEnvio: [this.generarNumeroRandom(8, 35)],
    });
  }

  ngOnInit(): void {
    this.loadEmpresas();
    console.log(this.cartService.getTotalCost());
    this.generarQR(this.cartService.getTotalCost());
  }



  generarQR(total: number | null) {
    if (total !== null) {
      const qrData = `Total a pagar: ${total}`;
      this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200`;
    }
  }

  calculateTotal() {
    this.totalCost = this.cartService.getTotalCost(); // Usa el método del servicio
    this.generarQR(this.totalCost); // Generar QR con el total
  }



  onDeliveryOptionChange(event: any) {
    this.selectedDeliveryOption = event.target.value;
  }



  toggleDeliveryOptions() {
    this.showDeliveryOptions = !this.showDeliveryOptions; // Alterna la visibilidad
  }

  processPurchase() {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      const idUser = currentUser.id;
      const productos = this.cartService.getCartProducts();
      const departamento = this.registerForm.get('departamento')?.value;
      const latitud = this.registerForm.get('latitud')?.value;
      const longitud = this.registerForm.get('longitud')?.value;

      // Obtener el deliveryEmail directamente del formulario
      const deliveryEmail = this.registerForm.get('deliveryEmail')?.value;

      // Calcular la fecha de entrega
      const fechaEntrega = new Date();
      fechaEntrega.setDate(fechaEntrega.getDate() + 2); // Sumar 2 días
      const formattedDate = fechaEntrega.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      const totalEnvio = this.registerForm.get('totalEnvio')?.value || this.generarNumeroRandom(8, 35); // Usa el valor del formulario o genera uno nuevo
      console.log("total envio  "+ totalEnvio);
      const carrito = new Carrito(
        idUser,
        totalEnvio,
        productos.map(item => ({
          id_producto: item.producto.id,
          cantidad: item.cantidad
        })),

        'pendiente', // O el estado que consideres
        departamento,
        latitud,
        longitud,
        deliveryEmail, // Usar el email del formulario
        this.registerForm.get('horario')?.value, // Enviar horario
        formattedDate // Enviar fecha de entrega
      );

      console.log('Datos del carrito a enviar:', carrito);

      this.cartService.enviarCarrito(carrito).subscribe({
        next: (response) => {
          console.log('Respuesta del backend al finalizar compra:', response);
          console.log('Compra finalizada con éxito!');
          this.cartService.clearCart();
          alert('Compra finalizada con éxito!');
          this.router.navigate(['/web2/pedidos']);
        },
        error: (err) => {
          console.error('Error al enviar el carrito:', err);
          alert('Hubo un error al procesar la compra. Intenta de nuevo.');
        }
      });


    } else {
      alert('No se pudo obtener el usuario actual.');
    }
  }

  generarNumeroRandom(min: number, max :number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  onDepartamentoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const departamentoSeleccionado = selectElement.value; // Obtener el valor seleccionado

    if (departamentoSeleccionado) {
      // Buscar las coordenadas del departamento seleccionado
      const selected = this.departamentos.find(d => d.name === departamentoSeleccionado);
      if (selected) {
        // Actualiza el centro del mapa
        this.mapCenter = selected.coords as L.LatLngTuple;
        this.mapComponent.setMapCenter(this.mapCenter);

        // Filtrar empresas por ubicación (suponiendo que tienes un mapeo de departamentos a ubicaciones)
        const locationMapping: { [key: string]: string } = {
          'La Paz': 'LPZ',
          'Cochabamba': 'CBBA',
          'Santa Cruz': 'SCZ',
          // Agrega más mapeos según tus necesidades
        };

        const locationCode = locationMapping[departamentoSeleccionado];

        // Llama al servicio para obtener empresas filtradas por el código de ubicación
        this.empresaService.findEmpresasByLocation(locationCode).subscribe(empresas => {
          this.empresas = empresas; // Asigna las empresas recibidas al array
        }, error => {
          console.error('Error al obtener empresas:', error);
        });
      }
    }
  }




  onLocationSelected(lat: number, lng: number): void {
    console.log('Latitud:', lat, 'Longitud:', lng); // Verifica que se reciban correctamente
    this.registerForm.patchValue({
      latitud: lat,
      longitud: lng
    });
  }
  loadEmpresas(): void {
    // Aquí podrías cargar empresas de un departamento predeterminado, si lo deseas
    this.empresaService.findEmpresasByLocation('LPZ').subscribe(empresas => {
      this.empresas = empresas;
    }, error => {
      console.error('Error al cargar empresas:', error);
    });
  }

  onEmpresaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const empresaId = Number(selectElement.value); // Convierte a número
    const selected = this.empresas.find(e => e.id === empresaId);
    if (selected) {
      this.selectedEmpresa.push(selected); // Añade la empresa seleccionada
      this.registerForm.patchValue({ empresa: selected.id });
      this.loadDeliveries(empresaId); // Llama al método para cargar deliveries
    }
  }

  loadDeliveries(empresaId: number): void {
    this.service.getUsersByEmpresa(empresaId).subscribe(
      (data) => {
        console.log('Deliveries recibidos:', data); // Imprime los datos recibidos
        this.deliveries = data; // Asigna los deliveries recibidos
      },
      (error) => {
        console.error('Error al obtener deliveries:', error);
      }
    );
  }

  onDeliveryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const deliveryId = Number(selectElement.value);
    const selectedDelivery = this.deliveries.find(d => d.id === deliveryId);

    if (selectedDelivery) {
      console.log('Email del delivery seleccionado:', selectedDelivery.email);

      // Actualiza el email en el formulario (opcional)
      this.registerForm.patchValue({ deliveryEmail: selectedDelivery.email });
    }
  }









}
