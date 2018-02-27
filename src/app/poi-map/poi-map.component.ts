import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MarkerDataService } from '../marker-data.service';
import { Observable } from 'rxjs/Observable';
import { Point } from '../point';
import { map } from 'rxjs/operators';
// import { LeafletMarkerClusterDirective } from '@asymmetrik/ngx-leaflet-markercluster';

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.css']
})
export class PoiMapComponent implements OnInit {

  private map: L.Map;

  // Open Street Map Definition
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    })
  };


  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer
  };

  // Values to bind to Leaflet Directive -> display the layers selection in the bottom right corner
  layersControlOptions = {
     position: 'bottomright',
     // baseLayers: this.baseLayers,
     // overlays: this.overlays
 };

  options = {
      center: new L.LatLng(-33.8546134516475, 151.170953500134), //sydney
      zoom: 13,
      minZoom: 0,
      maxZoom: 18,
     /* layers: [
        L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 0,
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
          key: 'cc9d9a847c5a41eba0abc9775cf558a3'
        })
      ]*/
    }

  markerClusterGroup: L.MarkerClusterGroup;

  markerClusterData: any[] = [];

  markerClusterOptions = <L.MarkerClusterGroupOptions>{
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true
  };

  constructor(
    private  markerDataService: MarkerDataService
  ) { }

  onMapReady(map: L.Map) {
    this.map = map;
    console.log('>> onMapReady <<', this.map);
  }

  markerClusterReady(markerCluster: L.MarkerClusterGroup) {
    // Do stuff with group
    console.log('>> markerClusterReady <<', markerCluster);
    this.markerClusterGroup = markerCluster;
  }


  ngOnInit() {

    this.markerDataService.getSydneyMarkerData()
      .subscribe(data => {
        this.markerClusterData = data.map(marker => {
          const icon = L.icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: marker.type.toString(),
            shadowUrl: 'assets/marker-shadow.png'
          });
          let leafletMarker = L.marker([ marker.location.lat, marker.location.lng ], { icon } );
          leafletMarker.bindPopup(marker.name);
          return leafletMarker;
        });
      });

/*    this.options = {
      center: new L.LatLng(-33.8546134516475, 151.170953500134), //sydney
      zoom: 13,
      minZoom: 0,
      maxZoom: 18,
      layers: [
        L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 0,
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
          key: 'cc9d9a847c5a41eba0abc9775cf558a3'
        })
      ]
    };*/
  }

}
