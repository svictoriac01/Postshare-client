import { Component, Input, OnInit, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', { static: true }) mapa: any;

  constructor() { }

  ngOnInit() {
    //console.log(this.coords);
    this.loadMap();
  }

  loadMap() {

    const latLng = this.coords.split(', ');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3ZpY3RvcmlhYzAxIiwiYSI6ImNrdXd1dzM1cjBvMW4yeHJmNnRzeGwxYmgifQ.XuuGdxE2EFaOmXvD5Ktxdg';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
      interactive: false
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
  }

}
