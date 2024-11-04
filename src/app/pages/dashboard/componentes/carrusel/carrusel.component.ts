import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarouselComponent implements OnInit {
  images = [
    { src: 'https://www.anahuac.mx/mexico/sites/default/files/styles/webp/public/noticias/Compra-de-artesanias-en-Mexico.jpg.webp?itok=PFlrI2YQ', alt: 'Artesanías en México' },
    { src: 'https://cdn.forbes.com.mx/2014/08/Cortesia-Artesanos-Mexico.jpg', alt: 'Artesanías Mexicanas' },
    { src: 'https://cdn.pixabay.com/photo/2016/11/19/15/38/craftsman-1839920_1280.jpg', alt: 'Artesano trabajando' },
    { src: 'https://cdn.pixabay.com/photo/2016/02/24/05/16/art-1219118_1280.jpg'},
    { src: 'https://cdn.pixabay.com/photo/2016/08/23/13/12/knitting-1614283_1280.jpg'},
    { src: 'https://cdn.pixabay.com/photo/2019/10/20/16/57/loom-4564223_1280.jpg'}
    // Agrega más imágenes aquí si es necesario
  ];

  currentIndex = 0;
  totalSlides = this.images.length;

  ngOnInit(): void {
    setInterval(() => this.nextSlide(), 3000); // Cambia la imagen cada 3 segundos
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
  }
}
