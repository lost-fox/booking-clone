export interface GetUserDataResponse {
  _id: string;
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  favoriteHotels?: FavoriteHotels[];
  links?: [];
  bookHotels?: string[];
}

export interface FavoriteHotels {
  hotelId: string;
  image: string;
}

export const getUserDataApi = async () => {
  const user = localStorage.getItem("UserData");
  if (!user) return;
  const id = JSON.parse(user).userId;
  const userData = fetch(`https://rsclone-server.herokuapp.com/user/${id}`)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .then((response) => response.json());

  return userData;

  //await fetch();
};
