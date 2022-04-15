/* eslint-disable @typescript-eslint/default-param-last */
import {
  FiltersActions,
  InitialFiltersState,
  FiltersActionsTypes,
} from "./types";
const initialState: InitialFiltersState = {
  checkInDate: "",
  checkOutDate: "",
  adultsNum: 0,
  childNum: 0,
  city: "",
  rooms: 1,
  categories: [],
  categoriesIds: [],
};

export const filtersReducer = (
  state = initialState,
  action: FiltersActions
): InitialFiltersState => {
  switch (action.type) {
    case FiltersActionsTypes.CHECKINDATE_LOADED:
      return { ...state, checkInDate: action.payload };
    case FiltersActionsTypes.CHECKOUTDATE_LOADED:
      return { ...state, checkOutDate: action.payload };
    case FiltersActionsTypes.ADULTSNUM_LOADED:
      return { ...state, adultsNum: action.payload };
    case FiltersActionsTypes.CHILDNUM_LOADED:
      return { ...state, childNum: action.payload };
    case FiltersActionsTypes.CITY_LOADED:
      return { ...state, city: action.payload };
    case FiltersActionsTypes.ROOMS_LOADED:
      return { ...state, rooms: action.payload };
    case FiltersActionsTypes.CATEGORIES_LOADED:
      return { ...state, categories: action.payload };
    case FiltersActionsTypes.CATEGORIESIDS_LOADED:
      return { ...state, categoriesIds: action.payload };
    default:
      return state;
  }
};
