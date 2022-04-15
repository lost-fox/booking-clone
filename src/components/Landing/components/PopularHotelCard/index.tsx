import { Link } from "react-router-dom";
import "./style.css";

const PopularHotelCard = (props: any) => {
  return (
    <Link to={`/hotel/${props.hotel.hotel_id}`}>
      <div className="popular-hotel-card">
        <div
          className="hotel-card__img"
          style={{
            backgroundImage: `url(${props.hotel.max_photo_url})`,
          }}
        ></div>
        <div className="popular-hotel-card__info">
          <h4 className="hotel-card__title-hotel">
            {props.hotel.hotel_name_trans}
          </h4>
          <div className="hotel-card-detail-descr">
            <h5 className="hotel-card__title-country">
              {props.hotel.address_trans}
            </h5>
            <p className="hotel-card__price">
              <span className="min-price-hotel">{props.hotel.district}</span>
            </p>
            <div className="hotel-card__rating flex">
              <div className="hotel-card__rating-grade">
                <p className="hotel-card__rating-grade-text">
                  {props.hotel.review_score || "-"}
                </p>
              </div>
              <div className="hotel-card__rating-status">
                {props.hotel.review_score_word || "нет оценок"}
              </div>
              <div className="hotel-card__rating-comments">
                {props.hotel.review_nr || "нет"} отзывов
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PopularHotelCard;
