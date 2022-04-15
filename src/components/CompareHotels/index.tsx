/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel, Rate } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppDispatch,
  AppState,
  getComparedHotelsFacilities,
  getComparedHotelsImages,
} from "../../store";
import "./style.css";

interface StateProps {
  compareHotelData: any;
  comparedHotelsImages: any;
  comparedHotelsFacilities: any;
}
interface DispatchProps {
  getComparedHotelsImages: (ids: number[]) => Promise<void>;
  getComparedHotelsFacilities: (ids: number[]) => Promise<void>;
}

type CompareHotelsComponentProps = StateProps & DispatchProps;

const CompareHotelsComponent: React.FC<CompareHotelsComponentProps> = (
  props
) => {
  const {
    compareHotelData,
    comparedHotelsImages,
    getComparedHotelsImages,
    comparedHotelsFacilities,
    getComparedHotelsFacilities,
  } = props;
  const [id, setId] = useState([
    compareHotelData[0].id,
    compareHotelData[1].id,
  ]);

  useEffect(() => {
    getComparedHotelsImages(id);
    getComparedHotelsFacilities(id);
  }, [id]);

  return (
    <div className="compare-hotels">
      <div className="container">
        <Link to="/hotels" className="compare-hotels-back">
          Вернуться к отелям
        </Link>
        <div className="hotels-cards-title">
          Отели, которые вы выбрали для сравнения
        </div>
        <div className="compare-container">
          {compareHotelData.map((hotel: any, index: number) => (
            <div className="compare-block" key={index}>
              <div className="compare-photos">
                <Carousel autoplay className="compare-hotel-slider">
                  {comparedHotelsImages[index]
                    ? comparedHotelsImages[index].map((img: string) => (
                        <img src={img} alt="" className="compare-hotel-img" />
                      ))
                    : ""}
                </Carousel>
              </div>
              <div className="compare-hotel-title">{hotel.hotel}</div>
              <div className="compare-hotel-block">
                <div className="compare-block-title">Рейтинг отеля</div>
                <div className="compare-rate-num">{hotel.score}</div>
                <Rate allowHalf defaultValue={+hotel.score / 2} disabled />
                <div className="compare-text">
                  По оценкам гостей: {hotel.word}
                </div>
              </div>
              <div className="compare-hotel-block">
                <div className="compare-block-title">Адрес</div>
                <div className="compare-text">{`${hotel.country}, ${hotel.city}`}</div>
                <div className="compare-text">{hotel.address}</div>
                <div className="compare-text">
                  Расстояние до центра {hotel.distance}
                </div>
              </div>
              <div className="compare-hotel-block">
                <div className="compare-block-title">Услуги отеля</div>
                <div className="compare-text"></div>
              </div>
              <div className="compare-facilities">
                <ul>
                  {comparedHotelsFacilities[index]
                    ? comparedHotelsFacilities[index].map((val: string) => (
                        <li className="compare-text">{val}</li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  compareHotelData: state.compareHotelsData.compareHotelData,
  comparedHotelsImages: state.compareHotelsData.comparedHotelsImages,
  comparedHotelsFacilities: state.compareHotelsData.comparedHotelsFacilities,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getComparedHotelsImages: (id) => dispatch(getComparedHotelsImages(id)),
  getComparedHotelsFacilities: (id) =>
    dispatch(getComparedHotelsFacilities(id)),
});

export const CompareHotels = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompareHotelsComponent);
