interface LoadedHotelsForCompareAction {
  type: CompareHotelsActionsTypes.HOTELSFORCOMPARE_LOADED;
  payload: number[];
}

interface LoadedCompareHotelDataAction {
  type: CompareHotelsActionsTypes.COMPAREHOTELDATA_LOADED;
  payload: any;
}

interface LoadedCompareHotelsDescriptionAction {
  type: CompareHotelsActionsTypes.COMPAREHOTELSDESCRIPTION_LOADED;
  payload: string[];
}
interface LoadedCompareHotelsImagesAction {
  type: CompareHotelsActionsTypes.COMPAREHOTELSIMAGES_LOADED;
  payload: string[];
}
interface LoadedCompareHotelsFacilitiesAction {
  type: CompareHotelsActionsTypes.COMPAREHOTELSFACILITIES_LOADED;
  payload: any;
}

export enum CompareHotelsActionsTypes {
  HOTELSFORCOMPARE_LOADED = "HOTELSFORCOMPARE_LOADED",
  COMPAREHOTELDATA_LOADED = "COMPAREHOTELDATA_LOADED",
  COMPAREHOTELSDESCRIPTION_LOADED = "COMPAREHOTELSDESCRIPTION_LOADED",
  COMPAREHOTELSIMAGES_LOADED = "COMPAREHOTELSIMAGES_LOADED",
  COMPAREHOTELSFACILITIES_LOADED = "COMPAREHOTELSFACILITIES_LOADED",
}

export type CompareHotelsActions =
  | LoadedHotelsForCompareAction
  | LoadedCompareHotelDataAction
  | LoadedCompareHotelsDescriptionAction
  | LoadedCompareHotelsImagesAction
  | LoadedCompareHotelsFacilitiesAction;

export interface InitialCompareHotelsState {
  hotelsForCompare: number[];
  compareHotelData: any;
  comparedHotelsDescription: string[];
  comparedHotelsImages: string[];
  comparedHotelsFacilities: any;
}
