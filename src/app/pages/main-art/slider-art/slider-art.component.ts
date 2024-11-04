import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/realAuth/service/auth.service';
import { usuario } from 'src/app/links/register/model/usuario';

@Component({
  selector: 'app-slider-art',
  templateUrl: './slider-art.component.html',
  styleUrls: ['./slider-art.component.css']
})
export class SliderArtComponent {
  email: string | null = null;

  constructor( private authService: AuthService) {}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    const currentUser = this.authService.getCurrentUser();
    console.log('Usuario actual:', currentUser); // Añade este log para verificar el usuario
    this.email = currentUser ? currentUser.email : null;
  }
}
