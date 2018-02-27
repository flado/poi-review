import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, filter, map, distinct } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Point } from './point';
import { Marker } from './marker';
import { MarkerType } from './marker-type.enum';
import { YesNo } from './yes-no.enum';


@Injectable()
export class MarkerDataService {

  constructor(private http: HttpClient) { }

  facilityType2MarkerType(facilityType: string): MarkerType {
    switch(facilityType.toLowerCase()) {
      case 'marina': {
        return MarkerType.MARINA;
      }
      case 'wharf': {
        return MarkerType.WHARF;
      }
      case 'boat ramp':
      case 'ramp': {
        return MarkerType.RAMP;
      }
      case 'courtesy mooring': {
        return MarkerType.MOURING;
      }
      default: {
        return null;
      }
    }
  }

  yesNo2Boolean(value: YesNo): boolean {
    return value === YesNo.YES ? true: false;
  }

  /**
   * Eliminates marker duplicates based on facility name and location
   * @param  {Point[]} data [description]
   * @return {Point[]}      [description]
   */
  removeDuplicates(data: Point[]): Point[] {
    return data.reduce(
        // acc = accumulator, pointInputSource = current value from data array : if pointInputSource is not in the accumulator array then it is added, otherwise accumulator is returned
        (acc: Point[], pointInputSource: Point) =>
          acc.findIndex(pointInAccumulator => this.identicalPoints(pointInAccumulator, pointInputSource)) < 0 ? [...acc, pointInputSource] : acc,
        [] //initial value = accumulator for first Point in the data array
    )
  }

  identicalPoints(p1: Point, p2:Point): boolean {
    return p1.attributes.Facility == p2.attributes.Facility
            && p1.attributes.Facility_Type == p2.attributes.Facility_Type;
            // && p1.location.lat.toFixed(2) == p2.location.lat.toFixed(2)
            //   && p1.location.lng.toFixed(2) == p2.location.lng.toFixed(2);
  }

  getSydneyMarkerData(): Observable<Marker[]> {
    return this.http.get('assets/marinas-sydney.json')
      .pipe(
        filter( (data: Point[], index: number) => data[index].location !== null),
        map( data => this.removeDuplicates(data)),
        //
        //distinct(data => of<Point[]>(data).distinct(point => point.attributes.Facility)),
        map( (data: Point[], index: number) => data.map(point => <Marker>{
          id: index,
          type: this.facilityType2MarkerType(point.attributes.Facility_Type),
          name: point.attributes.Facility,
          phone: point.attributes.Phone,
          address: point.attributes.Address,
          web: point.attributes.Web_address,
          hours: point.attributes.Operating_Hours,
          attrs: {
            berth: this.yesNo2Boolean(point.attributes.Berth),
            waterTaxi: this.yesNo2Boolean(point.attributes.Water_Taxi),
            mooring: this.yesNo2Boolean(point.attributes.Mooring),
            toilet: this.yesNo2Boolean(point.attributes.Toilet),
            food: this.yesNo2Boolean(point.attributes.Food),
            recreation: this.yesNo2Boolean(point.attributes.Recreation),
            dinghyStorage: this.yesNo2Boolean(point.attributes.Dinghy_Storage),
            fuel: this.yesNo2Boolean(point.attributes.Fuel),
            pumpOut: this.yesNo2Boolean(point.attributes.Pump_out),
            water: this.yesNo2Boolean(point.attributes.Water),
            power: this.yesNo2Boolean(point.attributes.Power),
            wifi: this.yesNo2Boolean(point.attributes.Wi_Fi),
            hardstandSlipway: this.yesNo2Boolean(point.attributes.Hardstand_Slipway),
            marineServices: this.yesNo2Boolean(point.attributes.Marine_Services),
          },
          comment: point.attributes.Comment,
          location: {
            lat: point.location.lat,
            lng: point.location.lng
          }
        })),
        tap( (markers: Marker[]) => {
          console.log(`Fetching "${markers.length}" markers from marinas-sydney.json`);
        }),
        catchError(this.handleError('getMarkerData', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`ERROR: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
