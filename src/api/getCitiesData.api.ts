export interface GetCitiesDataResponse {
  _id?: string;
  city?: string;
  country?: string;
  image?: string;
}

export const getCitiesDataApi = async () => {
  const cityData = fetch(`https://rsclone-server.herokuapp.com/cities`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());

  return cityData;
};
