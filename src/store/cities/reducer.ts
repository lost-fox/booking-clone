/* eslint-disable @typescript-eslint/default-param-last */
import { InitialCitiesState, CitiesActions, CitiesActionsTypes } from "./types";

const initialState: InitialCitiesState = {
  city: null,
};

export const citiesReducer = (
  state = initialState,
  action: CitiesActions
): InitialCitiesState => {
  switch (action.type) {
    case CitiesActionsTypes.CITIES_LOADED:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};
