import { Link } from "react-router-dom";
import "./style.css";

const PopularTownCard = (props: any) => {
  const id = props.id;

  if (!props.city) {
    return (
      <div className="popular-city__card">
        <div className="city-card__title flex">
          <h3 className="city-card__title-h3">Город</h3>
        </div>
      </div>
    );
  }

  const cityName: string = props.city[id].city;

  return (
    <Link
      to="/hotels"
      className="popular-city__card"
      style={{
        backgroundImage: `url(assets/cities/city/${props.city[id].image}.jpg)`,
      }}
      onClick={() => {
        props.getIdByLocation(cityName);
      }}
    >
      <div className="city-card__title flex">
        <h3 className="city-card__title-h3">{props.city[id].city}</h3>
        <div
          className="city-card__title-img"
          style={{
            background: `url(assets/cities/flags/${props.city[id].country}.svg) no-repeat center center`,
          }}
        ></div>
      </div>
    </Link>
  );
};

export default PopularTownCard;
