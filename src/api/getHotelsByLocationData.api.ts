export interface GetHotelsByLocationDataResponse {
  result: ResultHotel[];
}

export interface ResultHotel {
  country_trans: string;
  city_trans: string;
}

export const getHotelsByLocationDataApi = async () => {
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  if (latitude === null || longitude === null) return;

  const hotelsData = fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?checkin_date=2022-08-05&order_by=popularity&units=metric&longitude=${+longitude}&adults_number=2&latitude=${+latitude}&room_number=1&locale=ru&filter_by_currency=RUB&checkout_date=2022-08-06&children_number=1&children_ages=0&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());

  return hotelsData;
};
