import ContentHotel from "./content";
import Collage from "./gallery-hotel";
import "./style.css";
import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnyIfEmpty } from "react-redux";

const Hotel = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let isComponentMounted = true;

    const fetchHotelData = async () => {
      if (isComponentMounted) {
        try {
          const response = await fetch(
            `https://booking-com.p.rapidapi.com/v1/hotels/data?locale=ru&hotel_id=${id}`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "booking-com.p.rapidapi.com",
                "x-rapidapi-key":
                  "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
              },
            }
          );
          const json = await response.json();
          if (isComponentMounted) {
            setData(json);
            const lat = json.location.latitude;
            const lng = json.location.longitude;
            localStorage.setItem("lng", lng);
            localStorage.setItem("lat", lat);
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    setTimeout(() => {
      fetchHotelData();
    }, 1000);
    return () => {
      isComponentMounted = false;
    };
  }, [id]);

  return (
    <div className="container hotel-container">
      <Link to="/hotels" className="compare-hotels-back">
        Вернуться к отелям
      </Link>
      <Collage idHotel={id ? id : "0"} />
      <Suspense fallback={null}>
        <ContentHotel data={data} />
      </Suspense>
    </div>
  );
};

export default Hotel;
