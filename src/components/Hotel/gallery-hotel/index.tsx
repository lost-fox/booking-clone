import ImageHotel from "./image-hotel";
import { useEffect, useState } from "react";
import "./style.css";
import { Carousel } from "antd";

interface CollageInterface {
  idHotel: string;
}

const Collage = ({ idHotel }: CollageInterface) => {
  const testURL =
    "https://thumbs.gfycat.com/PotableEmbarrassedFrenchbulldog-max-1mb.gif";
  const [imageData, setImageData] = useState([
    { url_1440: testURL },
    { url_1440: testURL },
    { url_1440: testURL },
    { url_1440: testURL },
    { url_1440: testURL },
  ]);

  useEffect(() => {
    let isComponentMounted = true;

    const fetchData = async () => {
      if (isComponentMounted) {
        try {
          const response = await fetch(
            `https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=ru&hotel_id=${idHotel}`,
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
            setImageData(json);
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      isComponentMounted = false;
    };
  }, [idHotel]);

  localStorage.setItem("imgHotel", imageData[0].url_1440);

  return (
    <div className="collage">
      <Carousel autoplay className="hotel-slider-imgs">
        {imageData.slice(0, 10).map((img) => (
          <img src={img.url_1440} className="hotel-slider-img" />
        ))}
      </Carousel>
    </div>
  );
};

export default Collage;
