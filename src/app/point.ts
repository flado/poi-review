import { YesNo } from './yes-no.enum';

export interface Point {
  attributes: {
    Facility_Type: string,
    Facility: string,
    Phone: string,
    Address: string,
    Web_address: string,
    Operating_Hours: string,
    Berth: YesNo,
    Water_Taxi: YesNo,
    Mooring: YesNo,
    Toilet: YesNo,
    Food: YesNo,
    Recreation: YesNo,
    Dinghy_Storage: YesNo,
    Fuel: YesNo,
    Pump_out: YesNo,
    Water: YesNo,
    Power: YesNo,
    Wi_Fi: YesNo,
    Hardstand_Slipway: YesNo,
    Marine_Services: YesNo,
    Comment: string,
    OBJECTID: number
  };

  location: {
    lat: number,
    lng: number
  }

}
