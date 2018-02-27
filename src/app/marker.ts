import { MarkerType } from './marker-type.enum';

export interface Marker {
  id: number,
  type: MarkerType,
  name: string,
  phone: string,
  address: string,
  web: string,
  hours: string,
  attrs: {
    berth: boolean,
    waterTaxi: boolean,
    mooring: boolean,
    toilet: boolean,
    food: boolean,
    recreation: boolean,
    dinghyStorage: boolean,
    fuel: boolean,
    pumpOut: boolean,
    water: boolean,
    power: boolean,
    wifi: boolean,
    hardstandSlipway: boolean,
    marineServices: boolean,
  }
  comment: string,
  location: {
    lat: number,
    lng: number
  }
}
