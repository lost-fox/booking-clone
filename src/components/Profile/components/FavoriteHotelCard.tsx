import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
const { Meta } = Card;

export const FavoriteHotelCard = (props: any) => {
  const [data, setData] = useState();
  const hotelId = props.id;
  const image = props.image;
  useEffect(() => {
    const abortController = new AbortController();
    const fetchFavoriteHotelData = async () => {
      try {
        const response = await fetch(
          `https://booking-com.p.rapidapi.com/v1/hotels/data?locale=ru&hotel_id=${hotelId}`,
          {
            method: "GET",
            signal: abortController.signal,
            headers: {
              "x-rapidapi-host": "booking-com.p.rapidapi.com",
              "x-rapidapi-key":
                "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
            },
          }
        );
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchFavoriteHotelData();
    return () => {
      abortController.abort();
    };
  }, [hotelId]);
  const hotelInfo: any = data;

  if (hotelInfo === undefined)
    return (
      <div>
        <Spin size="large" />
      </div>
    );

  return (
    <>
      {hotelInfo.city && (
        <Card
          className="favorite-hotel-card"
          hoverable
          cover={<img alt="example" src={image} />}
        >
          <Meta
            title={hotelInfo.name}
            description={`${hotelInfo.address}, ${hotelInfo.city}`}
          />
        </Card>
      )}
    </>
  );
};
