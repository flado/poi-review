import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MarkerDataService } from './marker-data.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PoiMapComponent } from './poi-map/poi-map.component';


@NgModule({
  declarations: [
    AppComponent,
    PoiMapComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule,
    HttpClientModule
  ],
  providers: [
    MarkerDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
