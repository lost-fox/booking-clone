interface FetchHotelsAction {
  type: HotelsActionsTypes.HOTELS_FETCH;
}

interface LoadedHotelsAction {
  type: HotelsActionsTypes.HOTELS_LOADED;
  payload: any;
}

interface LoadedLocationAction {
  type: HotelsActionsTypes.LOCATION_LOADED;
  payload: string;
}
interface LoadedTotalPagesAction {
  type: HotelsActionsTypes.TOTALPAGES_LOADED;
  payload: number;
}

export enum HotelsActionsTypes {
  HOTELS_FETCH = "HOTELS_FETCH",
  HOTELS_LOADED = "HOTELS_LOADED",
  LOCATION_LOADED = "LOCATION_LOADED",
  TOTALPAGES_LOADED = "TOTALPAGES_LOADED",
}

export type HotelsActions =
  | FetchHotelsAction
  | LoadedHotelsAction
  | LoadedLocationAction
  | LoadedTotalPagesAction;

export interface InitialHotelsState {
  hotels: any;
  locationId: string;
  totalPages: number;
}
