import { GetCitiesDataResponse } from "../../api/getCitiesData.api";

interface LoadedCitiesAction {
  type: CitiesActionsTypes.CITIES_LOADED;
  payload: GetCitiesDataResponse;
}

export enum CitiesActionsTypes {
  CITIES_LOADED = "CITIES_LOADED",
}

export type CitiesActions = LoadedCitiesAction;

export interface InitialCitiesState {
  city: GetCitiesDataResponse | null;
}
