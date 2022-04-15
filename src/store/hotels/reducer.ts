/* eslint-disable @typescript-eslint/default-param-last */
import { HotelsActions, InitialHotelsState, HotelsActionsTypes } from "./types";
const initialState: InitialHotelsState = {
  hotels: [],
  locationId: "",
  totalPages: 0,
};

export const hotelsReducer = (
  state = initialState,
  action: HotelsActions
): InitialHotelsState => {
  switch (action.type) {
    case HotelsActionsTypes.HOTELS_FETCH:
      return { ...state };
    case HotelsActionsTypes.HOTELS_LOADED:
      return { ...state, hotels: action.payload };
    case HotelsActionsTypes.LOCATION_LOADED:
      return { ...state, locationId: action.payload };
    case HotelsActionsTypes.TOTALPAGES_LOADED:
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};
