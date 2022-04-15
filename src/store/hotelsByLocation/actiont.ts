import { AppThunk } from "..";
import { getHotelsByLocationDataApi } from "../../api/getHotelsByLocationData.api";
import { HotelsByLocationActions, HotelsByLocationActionsTypes } from "./types";

export const getHotelsByLocationData =
  (): AppThunk<HotelsByLocationActions> => async (dispatch) => {
    try {
      const hotelsByLocationData = await getHotelsByLocationDataApi();
      dispatch({
        type: HotelsByLocationActionsTypes.HOTELSLOCATION_LOADED,
        payload: hotelsByLocationData,
      });
    } catch (e) {}
  };
