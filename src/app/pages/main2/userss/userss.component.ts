import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/links/register/model/usuario';
import { ServiceService } from 'src/app/Service/service.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-userss',
  standalone: true,
  templateUrl: './userss.component.html',
  imports: [NgIf, NgForOf, FormsModule, ReactiveFormsModule, NgClass],
  styleUrls: ['./userss.component.css']
})
export class UserssComponent implements OnInit {

  isCreatingUser = false;
  usuarios: usuario[] = [];
  usuarioSelected: usuario = new usuario();
  errorMessage: string = '';
  registerForm: FormGroup;
  passwordVisible = false;


  constructor(private service: ServiceService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.service.findAll().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

//ACA CAMBIALO QUE SEA SOLO PARA EDITAR , EL ON SUBIT DE BAJO SE ENCARGARA DEL CRAR
  addUsuario(usuario: usuario): void {
    const userToSend: usuario = {
      id: usuario.id,
      name: usuario.name,
      lastname: usuario.lastname,
      email: usuario.email,
      password: '', // O asigna una nueva contraseña si es necesario
      enabled: usuario.enabled,
      admin: usuario.admin, // Si tu backend lo requiere
      roles: usuario.roles || [] // Asegúrate de que roles esté presente
    };

    // Imprimir el objeto que se va a enviar
    console.log('Enviando usuario al backend:', JSON.stringify(userToSend));

    if (usuario.id && usuario.id > 0) {
      this.service.update(userToSend).subscribe(
        updatedUser => {
          this.usuarios = this.usuarios.map(user => {
            if (user.id === usuario.id) {
              return {...updatedUser};
            }
            return user;
          });
          console.log('Usuario actualizado:', updatedUser); // Log de la respuesta del servidor
          this.resetUsuarioSelection()

        },
        error => {
          console.error('Error al actualizar el usuario:', error); // Log de error
          this.errorMessage = 'El correo electrónico no es valido.';
        }
      );
    } else {
      this.service.create(userToSend).subscribe(
        newUser => {
          this.usuarios = [...this.usuarios, {...newUser}];
          console.log('Usuario creado:', newUser); // Log de la respuesta del servidor
        },
        error => {
          console.error('Error al crear el usuario:', error); // Log de error
        }
      );
    }


  }


  updateUser(user: usuario): void {
    this.usuarioSelected = {...user};
  }

  edit(usuario: usuario): void {
    this.updateUser(usuario);
  }

  delete(usuario: usuario): void {
    this.service.delete(usuario).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }

  resetUsuarioSelection(): void {
    this.usuarioSelected = new usuario();
  }

//ESTO ES PARA OCULATR O MOSTRAR EL FORM DE CREACION DE USUARIO ADMIN
  agregarUsuario() {
    this.isCreatingUser = true; // Cambiar a verdadero para mostrar el formulario
  }

  // Método para cancelar la creación de un usuario
  cancelarCreacion() {
    this.isCreatingUser = false; // Cambiar a falso para ocultar el formulario
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return !(hasUpperCase && hasSpecialChar) ? {passwordStrength: true} : null;
  }

}
