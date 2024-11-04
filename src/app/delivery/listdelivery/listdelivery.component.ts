import { Component, OnInit } from '@angular/core';
import { DeliveryDTO } from "../model/DeliveryDTO";
import { DeliveryService } from "../service/delivery.service";
import { EmpresaService } from "../../empresa/service/empresa.service";
import { empresa } from 'src/app/empresa/model/empresa';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-listdelivery',
  templateUrl: './listdelivery.component.html',
  styleUrls: ['./listdelivery.component.css']
})
export class ListdeliveryComponent implements OnInit {
  deliverys: DeliveryDTO[] = []; // Array para almacenar los deliverys
  editForm: FormGroup;
  isEditing: boolean = false;
  empresas: empresa[] = []; // Lista de empresas
  selectedDelivery: DeliveryDTO | null = null; // Delivery seleccionado para editar

  constructor(
    private deliveryService: DeliveryService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      empresa: ['', Validators.required] // Campo para seleccionar la empresa
    });
  }

  ngOnInit(): void {
    this.fetchDeliverys();
    this.loadEmpresa(); // Cargar empresas al iniciar
  }

  fetchDeliverys(): void {
    this.deliveryService.getDeliverys().subscribe(
      (data: DeliveryDTO[]) => {
        this.deliverys = data;
      },
      (error) => {
        console.error('Error fetching deliverys', error);
      }
    );
  }

  loadEmpresa(): void {
    this.empresaService.findAllEmp().subscribe(empresas => {
      this.empresas = empresas;
      console.log("Empresas cargadas: "+ this.empresas);

    }, error => {
      console.error('Error al cargar empresas', error);
    });
  }

  editDelivery(delivery: DeliveryDTO) {
    this.selectedDelivery = delivery; // Asignar el delivery seleccionado
    this.editForm.patchValue({
      empresa: delivery.empresa.id // Cargar el ID de la empresa en el formulario
    });
    this.isEditing = true; // Activar el modo de edición
  }

  updateDelivery() {
    if (this.editForm.valid && this.selectedDelivery) {
      const updatedEmpresaId = this.editForm.value.empresa;
      const deliveryRoleId = this.selectedDelivery.deliveryRoleId;

      const updatedDelivery: DeliveryDTO = {
        ...this.selectedDelivery,
        empresa: {
          id: updatedEmpresaId,
          name: this.selectedDelivery.empresa.name // Asegúrate de que el nombre se mantenga
        }
      };

      this.deliveryService.update(deliveryRoleId, updatedDelivery).subscribe(() => {
        alert('Delivery actualizado con éxito');
        this.editForm.reset(); // Reiniciar el formulario
        this.isEditing = false; // Salir del modo de edición
        this.selectedDelivery = null; // Limpiar la selección
        this.fetchDeliverys(); // Re-fetch deliverys para obtener los datos actualizados
      }, error => {
        console.error('Error al actualizar el delivery', error);
      });
    } else {
      console.error('Formulario inválido o delivery no seleccionado');
    }
  }

  deleteDelivery(delivery: DeliveryDTO) {
    if (confirm('¿Estás seguro de que deseas eliminar este delivery?')) {
      this.deliveryService.deleteDelivery(delivery.deliveryRoleId).subscribe(() => {
        this.deliverys = this.deliverys.filter(d => d.deliveryRoleId !== delivery.deliveryRoleId);
        alert('Delivery eliminado con éxito');
      }, error => {
        alert('Error al eliminar el delivery');
        console.error(error);
      });
    }
  }
}
