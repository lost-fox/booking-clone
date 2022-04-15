import HotelName from "./hotel-name";
import InnerLeft from "./inner-left";
import InnerRight from "./inner-right";
import "./style.css";
import { useState, useEffect, Suspense } from "react";

const ContentHotel = (props: any) => {
  const [name, setItems] = useState("");

  useEffect(() => {
    setItems(props.data.name);
  }, [name, props.data.name]);

  return (
    <Suspense fallback={null}>
      <HotelName name={props.data.name} />

      <div className="container-room">
        <InnerLeft
          score={props.data.review_score}
          scoreText={props.data.review_score_word}
          idHotel={props.data.hotel_id}
        />
        <InnerRight data={props.data} />
      </div>
    </Suspense>
  );
};

export default ContentHotel;
