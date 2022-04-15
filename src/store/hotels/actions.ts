import { AppThunk } from "..";
import { HotelsActions, HotelsActionsTypes } from "./types";

export const getIdLocation = async (location: string) => {
  const response = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=ru&name=${location}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const result = await response.json();
  return result[0].dest_id;
};

const getHotelsData = async (request: any) => {
  const response = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${
      request.checkOutDate
    }&room_number=${
      request.rooms || 1
    }&filter_by_currency=AED&dest_type=city&locale=ru&checkin_date=${
      request.checkInDate
    }&adults_number=${
      request.adultsNum || 1
    }&order_by=popularity&units=metric&dest_id=${
      request.locationId
    }&children_number=${request.childNum || 1}${
      request.categoriesIds.length
        ? `&categories_filter_ids=${request.categoriesIds.join(",")}`
        : ""
    }&include_adjacency=true&page_number=${request.page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  );
  const result = await response.json();
  return result;
};

export const getIdByLocation =
  (location: string): AppThunk<HotelsActions> =>
  async (dispatch) => {
    try {
      dispatch({
        type: HotelsActionsTypes.LOCATION_LOADED,
        payload: location,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const getHotels =
  (request: any): AppThunk<HotelsActions> =>
  async (dispatch) => {
    dispatch({ type: HotelsActionsTypes.HOTELS_FETCH });
    try {
      getIdLocation(request.locationId).then((id) =>
        getHotelsData({ ...request, locationId: id }).then((data) => {
          dispatch({
            type: HotelsActionsTypes.HOTELS_LOADED,
            payload: data.result,
          });
          dispatch({
            type: HotelsActionsTypes.TOTALPAGES_LOADED,
            payload: Math.ceil(data.count / 20),
          });
        })
      );
    } catch (e) {}
  };
