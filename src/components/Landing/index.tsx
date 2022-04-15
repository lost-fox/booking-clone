import "./style.css";
import { FormHotel } from "./components/FormHotel";
import PopularTownCard from "./components/PopularTownCard";
import PopularHotelCard from "./components/PopularHotelCard";
import AnimationBackground from "./components/animation-background";
import { useEffect } from "react";
import { AppDispatch, AppState, getIdByLocation } from "../../store";
import { connect, useSelector } from "react-redux";
import { getCitiesData } from "../../store/cities/actions";
import { GetHotelsByLocationDataResponse } from "../../api/getHotelsByLocationData.api";
import { Spin } from "antd";

interface StateProps {
  city: any;
}
interface DispatchProps {
  getCitiesData: () => Promise<void>;
  getIdByLocation: (city: string) => Promise<void>;
}

type LandingProps = StateProps & DispatchProps;

const Landing: React.FC<LandingProps> = (props) => {
  const { city, getCitiesData: getData, getIdByLocation } = props;

  useEffect(() => {
    getData();
  }, [getData]);

  const hotelByLocation = useSelector<
    AppState,
    GetHotelsByLocationDataResponse | null
  >((state) => state.hotelsByLocationData.hotelsByLocation);

  const getRundomNum = (finish: number) => {
    return Math.floor(Math.random() * (0 - finish) + finish);
  };

  if (hotelByLocation === null)
    return (
      <div className="expectation background">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="container">
      <div className="background">
        <AnimationBackground />
      </div>
      <div className="find-hotel">
        <FormHotel />
      </div>
      <div className="popular-city flex">
        {[...new Array(5)].map((val, index) => (
          <PopularTownCard
            city={city}
            id={index}
            getIdByLocation={getIdByLocation}
            key={index}
          />
        ))}
      </div>
      <div className="popular-hotels">
        <h2 className="popular-hotels__title">
          {hotelByLocation.result[0].country_trans === undefined
            ? "Вы находитесь в прекрасном месте"
            : `${hotelByLocation.result[0].country_trans} - прекрасная страна!`}
        </h2>
        <div className="popular-hotels-cards flex">
          {[...new Array(4)].map((val, index) => (
            <PopularHotelCard
              hotel={
                hotelByLocation.result[
                  getRundomNum(hotelByLocation.result.length)
                ]
              }
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  city: state.citiesData.city,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCitiesData: () => dispatch(getCitiesData()),
  getIdByLocation: (city) => dispatch(getIdByLocation(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
