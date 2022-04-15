import { Tag, Divider } from "antd";
import "./style.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { colors } from "../../../../constants/colors-tags";

const TagsWorth = () => {
  const [dataTags, setData] = useState([
    {
      facility_name: "Питание и напитки",
    },
  ]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=${id}&locale=ru`,
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
    fetchData();
  }, [id]);
  if (!Array.isArray(dataTags)) {
    console.log(">>> dataTagsMap", { dataTags });
    return null;
  }
  const result = dataTags.map((obj, i) => {
    const numColor = i + 2 > colors.length ? i % colors.length : i;
    return <Tag color={colors[numColor]}>{obj.facility_name}</Tag>;
  });

  return (
    <>
      <Divider orientation="left" className="hotel-info-title">
        Удобства
      </Divider>
      <div className="tags-inner">{result}</div>
    </>
  );
};

export default TagsWorth;
