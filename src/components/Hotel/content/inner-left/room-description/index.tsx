import { Divider } from "antd";
import RoomCancel from "./room-cancel";
import RoomRule from "./room-rule";
import { Suspense, useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router";

const RoomDescription = () => {
  const [data, setData] = useState({
    descriptiontype_id: 0,
    extra_lines: {
      imp_info: "",
    },
    languagecode: "ru",
    description: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://booking-com.p.rapidapi.com/v1/hotels/description?locale=ru&hotel_id=${id}`,
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
        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDescription();
  }, [id]);

  return (
    <>
      <Divider orientation="left">Сведения о номере</Divider>
      <div className="room-description">
        {/* <RoomRule impInfo={data.extra_lines.imp_info} /> */}
        <Suspense fallback={null}>
          <RoomCancel description={data.description} />
        </Suspense>
      </div>
    </>
  );
};

export default RoomDescription;
