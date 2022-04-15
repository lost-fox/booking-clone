interface LoadedCheckInDateAction {
  type: FiltersActionsTypes.CHECKINDATE_LOADED;
  payload: string;
}

interface LoadedCheckOutDateAction {
  type: FiltersActionsTypes.CHECKOUTDATE_LOADED;
  payload: string;
}

interface LoadedAdultsNumAction {
  type: FiltersActionsTypes.ADULTSNUM_LOADED;
  payload: number;
}

interface LoadedCityAction {
  type: FiltersActionsTypes.CITY_LOADED;
  payload: string;
}

interface LoadedChildNumAction {
  type: FiltersActionsTypes.CHILDNUM_LOADED;
  payload: number;
}

interface LoadedRoomsAction {
  type: FiltersActionsTypes.ROOMS_LOADED;
  payload: number;
}

interface LoadedCategoriesAction {
  type: FiltersActionsTypes.CATEGORIES_LOADED;
  payload: string[];
}

interface LoadedCategoriesIdsAction {
  type: FiltersActionsTypes.CATEGORIESIDS_LOADED;
  payload: string[];
}

export enum FiltersActionsTypes {
  CHECKINDATE_LOADED = "CHECKINDATE_LOADED",
  CHECKOUTDATE_LOADED = "CHECKOUTDATE_LOADED",
  ADULTSNUM_LOADED = "ADULTSNUM_LOADED",
  CHILDNUM_LOADED = "CHILDNUM_LOADED",
  CITY_LOADED = "CITY_LOADED",
  ROOMS_LOADED = "ROOMS_LOADED",
  CATEGORIES_LOADED = "CATEGORIES_LOADED",
  CATEGORIESIDS_LOADED = "CATEGORIESIDS_LOADED",
}

export type FiltersActions =
  | LoadedCheckInDateAction
  | LoadedCheckOutDateAction
  | LoadedAdultsNumAction
  | LoadedChildNumAction
  | LoadedCityAction
  | LoadedRoomsAction
  | LoadedCategoriesAction
  | LoadedCategoriesIdsAction;

export interface InitialFiltersState {
  checkInDate: string;
  checkOutDate: string;
  adultsNum: number;
  childNum: number;
  city: string;
  rooms: number;
  categories: string[];
  categoriesIds: string[];
}
