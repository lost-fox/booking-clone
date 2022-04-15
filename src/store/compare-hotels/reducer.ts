/* eslint-disable @typescript-eslint/default-param-last */
import {
  CompareHotelsActions,
  InitialCompareHotelsState,
  CompareHotelsActionsTypes,
} from "./types";
const initialState: InitialCompareHotelsState = {
  hotelsForCompare: [],
  compareHotelData: [],
  comparedHotelsDescription: [],
  comparedHotelsImages: [],
  comparedHotelsFacilities: [],
};

export const compareHotelsReducer = (
  state = initialState,
  action: CompareHotelsActions
): InitialCompareHotelsState => {
  switch (action.type) {
    case CompareHotelsActionsTypes.HOTELSFORCOMPARE_LOADED:
      return { ...state, hotelsForCompare: action.payload };
    case CompareHotelsActionsTypes.COMPAREHOTELDATA_LOADED:
      return { ...state, compareHotelData: action.payload };
    case CompareHotelsActionsTypes.COMPAREHOTELSDESCRIPTION_LOADED:
      return { ...state, comparedHotelsDescription: action.payload };
    case CompareHotelsActionsTypes.COMPAREHOTELSIMAGES_LOADED:
      return { ...state, comparedHotelsImages: action.payload };
    case CompareHotelsActionsTypes.COMPAREHOTELSFACILITIES_LOADED:
      return { ...state, comparedHotelsFacilities: action.payload };
    default:
      return state;
  }
};
