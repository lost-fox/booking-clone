/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-shadow */
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  AppDispatch,
  AppState,
  getCategories,
  getComparedHotels,
  getComparedHotelsMainData,
  getHotels,
  getIdByLocation,
} from "../../store";
import HotelCard from "./components/HotelCard";
import { filterComponents } from "./constants/filterParams";
import "./style.css";
import { Button, Input, Pagination, Spin } from "antd";

interface StateProps {
  hotels: any[];
  locationId: string;
  checkInDate: string;
  checkOutDate: string;
  adultsNum: number;
  childNum: number;
  rooms: number;
  totalPages: number;
  categoriesIds: string[];
  hotelsForCompare: number[];
  compareHotelData: any;
}
interface DispatchProps {
  getHotels: (request: any) => Promise<void>;
  getCategories: (request: any) => Promise<void>;
  getIdByLocation: (city: string) => Promise<void>;
  getComparedHotels: (ids: number[]) => Promise<void>;
  getComparedHotelsMainData: (hotels: any) => Promise<void>;
}
interface HotelsComponentParams {}
type HotelsComponentProps = StateProps & DispatchProps & HotelsComponentParams;

const HotelsComponent: React.FC<HotelsComponentProps> = (props) => {
  const {
    hotels,
    locationId,
    checkInDate,
    checkOutDate,
    adultsNum,
    childNum,
    rooms,
    totalPages,
    categoriesIds,
    hotelsForCompare,
    compareHotelData,
    getHotels,
    getCategories,
    getIdByLocation,
    getComparedHotels,
    getComparedHotelsMainData,
  } = props;

  const [page, setPage] = useState(0);

  const [hotelsParams, setHotelsParams] = useState({
    locationId,
    checkInDate,
    checkOutDate,
    adultsNum,
    childNum,
    categoriesIds,
    rooms,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    getHotels({
      locationId: hotelsParams.locationId,
      checkInDate: hotelsParams.checkInDate,
      checkOutDate: hotelsParams.checkOutDate,
      adultsNum: hotelsParams.adultsNum,
      childNum: hotelsParams.childNum,
      page,
      totalPages,
      categoriesIds: hotelsParams.categoriesIds,
      rooms: hotelsParams.rooms,
    });
    getCategories({
      locationId: hotelsParams.locationId,
      checkInDate: hotelsParams.checkInDate,
      checkOutDate: hotelsParams.checkOutDate,
      adultsNum: hotelsParams.adultsNum,
      childNum: hotelsParams.childNum,
      rooms: hotelsParams.rooms,
    });
  }, [page, hotelsParams]);

  return (
    <div className="hotels">
      <div className="container">
        <div className="hotels-filters">
          <div className="filter-block">
            <span className="filter-title filter-title-select">город</span>
            <Input
              placeholder="Москва"
              defaultValue={locationId}
              name="place-town"
              className="filters-hotel-input"
              onChange={(e) => {
                getIdByLocation((e.target as HTMLInputElement).value);
              }}
            />
          </div>

          {filterComponents.map((component, index) => (
            <div className="filter-block" key={index}>
              {component}
            </div>
          ))}
          <Button
            type="primary"
            onClick={() => {
              setHotelsParams({
                locationId,
                checkInDate,
                checkOutDate,
                adultsNum,
                childNum,
                categoriesIds,
                rooms,
              });
            }}
          >
            Применить
          </Button>
        </div>
        <div className="hotels-cards">
          <div className="hotels-cards-title">
            Номера, которые мы для вас подобрали
          </div>
          <div className="hotels-cards-container">
            {hotels.map((val, index) => {
              return (
                <HotelCard
                  data={val}
                  key={index}
                  hotelsForCompare={hotelsForCompare}
                  getComparedHotels={getComparedHotels}
                  compareHotelData={compareHotelData}
                  getComparedHotelsMainData={getComparedHotelsMainData}
                />
              );
            })}
          </div>
          <Pagination
            current={page + 1}
            total={totalPages * 10}
            onChange={() => {
              setPage(page + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: AppState): StateProps => ({
  hotels: state.hotelsData.hotels,
  locationId: state.hotelsData.locationId,
  checkInDate: state.filtersData.checkInDate,
  checkOutDate: state.filtersData.checkOutDate,
  adultsNum: state.filtersData.adultsNum,
  childNum: state.filtersData.childNum,
  rooms: state.filtersData.rooms,
  totalPages: state.hotelsData.totalPages,
  categoriesIds: state.filtersData.categoriesIds,
  hotelsForCompare: state.compareHotelsData.hotelsForCompare,
  compareHotelData: state.compareHotelsData.compareHotelData,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getHotels: (request) => dispatch(getHotels(request)),
  getCategories: (request) => dispatch(getCategories(request)),
  getIdByLocation: (city) => dispatch(getIdByLocation(city)),
  getComparedHotels: (ids) => dispatch(getComparedHotels(ids)),
  getComparedHotelsMainData: (hotels) =>
    dispatch(getComparedHotelsMainData(hotels)),
});

export const Hotels = connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelsComponent);
