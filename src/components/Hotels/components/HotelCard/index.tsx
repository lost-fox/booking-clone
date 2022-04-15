/* eslint-disable prefer-const */
import { Button, Rate, Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetUserDataResponse } from "../../../../api/getUserData.api";
import { useHttp } from "../../../../hooks/http.hooks";
import { AppState } from "../../../../store";
import { getUserData } from "../../../../store/users/actions";
import "./style.css";

const HotelCard = (props: any) => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const user = useSelector<AppState, GetUserDataResponse | null>(
    (state) => state.usersData.user
  );

  const [compared, setCompared] = useState(
    [...props.hotelsForCompare].includes(props.data.hotel_id) ? true : false
  );
  let [favorite, setFavorite] = useState(false);

  const favoriteHandler = async () => {
    try {
      const hotelId = props.data.hotel_id.toString();
      const image = props.data.max_1440_photo_url;
      await request(
        `https://rsclone-server.herokuapp.com/user/${user?._id}/favorite`,
        "PATCH",
        { hotelId, image }
      );
      dispatch(getUserData());
    } catch (error) {
      console.log(error);
    }
  };

  user?.favoriteHotels?.map((hotel) => {
    if (hotel.hotelId == props.data.hotel_id) favorite = true;
  });

  return (
    <div className="hotel-card">
      <div
        className="hotel-card-img"
        style={{ backgroundImage: `url(${props.data.max_photo_url})` }}
      >
        <div
          className={`${
            favorite ? " favorite-icon favorite" : "favorite-icon"
          }`}
          onClick={() => {
            setFavorite(!favorite);
            favoriteHandler();
          }}
        ></div>
      </div>
      <span className="hotel-name">
        <b>{props.data.hotel_name_trans}</b>
      </span>
      <span className="hotel-description">{props.data.address_trans}</span>
      <div className="hotel-card-info">
        <span>{props.data.distance_to_cc}км до центра</span>
        <span>
          <b>от {props.data.min_total_price}₽</b>
        </span>
      </div>
      <hr className="card-info-line" />
      <div className="hotel-card-info">
        <Rate
          className="rate-icon"
          allowHalf
          defaultValue={+props.data.review_score / 2}
        />
        <span>{props.data.review_score_word}</span>
      </div>
      <Link to={`/hotel/${props.data.hotel_id}`}>
        <Button className="more-hotel-btn">Подробнее</Button>
      </Link>
      <div
        className={`compared-card-btn ${compared ? "active-compare" : ""}`}
        onClick={() => {
          if (!compared) {
            if (props.hotelsForCompare.length < 2) {
              const arr = [...props.hotelsForCompare, props.data.hotel_id];
              props.getComparedHotels(arr);
              setCompared(true);
              const obj = {
                id: props.data.hotel_id,
                country: props.data.country_trans,
                address: props.data.address_trans,
                city: props.data.city_trans,
                distance: props.data.distance_to_cc,
                hotel: props.data.hotel_name_trans,
                img: props.data.max_1440_photo_url,
                score: props.data.review_score,
                word: props.data.review_score_word,
              };
              props.getComparedHotelsMainData([...props.compareHotelData, obj]);
            }
          } else {
            props.getComparedHotels([
              ...props.hotelsForCompare.filter(
                (val: string) => val != props.data.hotel_id
              ),
            ]);
            props.getComparedHotelsMainData([
              ...props.compareHotelData.filter(
                (val: any) => val.id !== props.data.hotel_id
              ),
            ]);
            setCompared(false);
          }
        }}
      ></div>
    </div>
  );
};

export default HotelCard;
