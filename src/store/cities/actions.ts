import { AppThunk } from "..";
import { getCitiesDataApi } from "../../api/getCitiesData.api";
import { CitiesActions, CitiesActionsTypes } from "./types";

export const getCitiesData =
  (): AppThunk<CitiesActions> => async (dispatch) => {
    try {
      const citiesData = await getCitiesDataApi();
      dispatch({
        type: CitiesActionsTypes.CITIES_LOADED,
        payload: citiesData,
      });
    } catch (e) {}
  };
