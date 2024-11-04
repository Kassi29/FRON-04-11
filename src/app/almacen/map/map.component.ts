
import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();
  @Input() center: L.LatLngTuple = [-16.5000, -68.1193];
  private map!: L.Map;
  private currentMarker!: L.Marker;

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map').setView(this.center, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      this.updateMarker(lat, lng);
      this.locationSelected.emit({ lat, lng });
    });

    this.updateMarker(this.center[0], this.center[1]); // Añadir marcador inicial
  }

  private updateMarker(lat: number, lng: number) {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    this.currentMarker = L.marker([lat, lng]).addTo(this.map);
    this.map.setView([lat, lng]); // Centrar el mapa en el nuevo marcador
  }

  setMapCenter(coords: L.LatLngTuple) {
    this.center = coords;
    this.map.setView(coords);
    this.updateMarker(coords[0], coords[1]); // Actualizar el marcador al nuevo centro
  }
}
