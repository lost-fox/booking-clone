import { GetHotelsByLocationDataResponse } from "../../api/getHotelsByLocationData.api";

interface LoadedHotelsByLocationAction {
  type: HotelsByLocationActionsTypes.HOTELSLOCATION_LOADED;
  payload: GetHotelsByLocationDataResponse;
}

export enum HotelsByLocationActionsTypes {
  HOTELSLOCATION_LOADED = "HOTELSLOCATION_LOADED",
}

export type HotelsByLocationActions = LoadedHotelsByLocationAction;

export interface InitialHotelsByLocationState {
  hotelsByLocation: GetHotelsByLocationDataResponse | null;
}
