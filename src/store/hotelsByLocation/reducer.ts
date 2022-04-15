import {
  InitialHotelsByLocationState,
  HotelsByLocationActions,
  HotelsByLocationActionsTypes,
} from "./types";

const initialState: InitialHotelsByLocationState = {
  hotelsByLocation: null,
};

export const hotelsByLocationReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: HotelsByLocationActions
): InitialHotelsByLocationState => {
  switch (action.type) {
    case HotelsByLocationActionsTypes.HOTELSLOCATION_LOADED:
      return { ...state, hotelsByLocation: action.payload };
    default:
      return state;
  }
};
