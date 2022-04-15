import { AppThunk } from "..";
import { CompareHotelsActions, CompareHotelsActionsTypes } from "./types";

export const getComparedHotels =
  (hotels: number[]): AppThunk<CompareHotelsActions> =>
  async (dispatch) => {
    try {
      dispatch({
        type: CompareHotelsActionsTypes.HOTELSFORCOMPARE_LOADED,
        payload: hotels,
      });
    } catch (e) {
      console.log(e);
    }
  };
export const getComparedHotelsMainData =
  (hotels: any): AppThunk<CompareHotelsActions> =>
  async (dispatch) => {
    try {
      dispatch({
        type: CompareHotelsActionsTypes.COMPAREHOTELDATA_LOADED,
        payload: hotels,
      });
    } catch (e) {
      console.log(e);
    }
  };

const getHotelsDescription = async (ids: number[]) => {
  const res1 = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/description?locale=ru&hotel_id=${ids[0]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const res2 = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/description?locale=ru&hotel_id=${ids[1]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const result1 = await res1.json();
  const result2 = await res2.json();
  return [result1.description, result2.description];
};
const getHotelsImages = async (ids: number[]) => {
  const res1 = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=ru&hotel_id=${ids[0]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const res2 = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=ru&hotel_id=${ids[1]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const result1 = await res1.json();
  const result2 = await res2.json();
  return [
    result1.map((val: any) => val.url_1440).slice(0, 10),
    result2.map((val: any) => val.url_1440).slice(0, 10),
  ];
};
const getHotelsFacilities = async (ids: number[]) => {
  const res1 = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=${ids[0]}&locale=ru`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const res2 = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=${ids[1]}&locale=ru`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const result1 = await res1.json();
  const result2 = await res2.json();
  return [
    result1.map((val: any) => val.facility_name),
    result2.map((val: any) => val.facility_name),
  ];
};

export const getComparedHotelsDescription =
  (ids: number[]): AppThunk<CompareHotelsActions> =>
  async (dispatch) => {
    try {
      getHotelsDescription(ids).then((data) => {
        dispatch({
          type: CompareHotelsActionsTypes.COMPAREHOTELSDESCRIPTION_LOADED,
          payload: data,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

export const getComparedHotelsImages =
  (ids: number[]): AppThunk<CompareHotelsActions> =>
  async (dispatch) => {
    try {
      getHotelsImages(ids).then((data) => {
        dispatch({
          type: CompareHotelsActionsTypes.COMPAREHOTELSIMAGES_LOADED,
          payload: data,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
export const getComparedHotelsFacilities =
  (ids: number[]): AppThunk<CompareHotelsActions> =>
  async (dispatch) => {
    try {
      getHotelsFacilities(ids).then((data) => {
        dispatch({
          type: CompareHotelsActionsTypes.COMPAREHOTELSFACILITIES_LOADED,
          payload: data,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
