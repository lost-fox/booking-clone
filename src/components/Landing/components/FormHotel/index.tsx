import { Input, Form } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, AppState } from "../../../../store";
import {
  getCheckInDate,
  getCheckOutDate,
  getCity,
} from "../../../../store/filters/actions";
import { getIdByLocation } from "../../../../store/hotels/actions";
import { Comfortables } from "../../../Hotels/components/Comfortables";
import { DateArrive } from "../../../Hotels/components/Dates/DateArrive";
import { DateLeave } from "../../../Hotels/components/Dates/DateLeave";
import { Select } from "../../../Hotels/components/Select";
import "./style.css";

interface StateProps {
  locationId: string;
}
interface DispatchProps {
  getIdByLocation: (location: string) => Promise<void>;
  getCheckInDate: (checkInDate: string) => Promise<void>;
  getCheckOutDate: (checkOutDate: string) => Promise<void>;
  getCity: (city: string) => Promise<void>;
}

type FormHotelProps = StateProps & DispatchProps;

const FormHotelComponent: React.FC<FormHotelProps> = (props) => {
  const { getIdByLocation, getCity } = props;
  const [city, setCity] = useState("");
  return (
    <Form>
      <p className="find-hotel__title">Найдём номера под ваши пожелания</p>
      <div className="filter-block">
        <label htmlFor="place-town" className="label-text">
          Город
        </label>
        <Form.Item
          rules={[{ required: true, message: "Пожалуйста, введите город" }]}
        >
          <Input
            placeholder="Москва"
            name="place-town"
            className="form-hotel-input"
            onChange={(e) => {
              setCity((e.target as HTMLInputElement).value);
              getCity((e.target as HTMLInputElement).value);
            }}
          />
        </Form.Item>
      </div>
      <div className="filter-block">
        <DateArrive />
      </div>
      <div className="filter-block">
        <DateLeave />
      </div>

      <div className="filter-block">
        <label htmlFor="guest" className="label-text">
          Гости
        </label>
        <Select />
      </div>
      <div className="filter-block">
        <Comfortables />
      </div>

      <Link
        className="find-hotel__button"
        to="/hotels"
        onClick={() => {
          getIdByLocation(city);
        }}
      >
        подобрать номер
      </Link>
    </Form>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  locationId: state.hotelsData.locationId,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getIdByLocation: (location) => dispatch(getIdByLocation(location)),
  getCheckInDate: (checkInDate) => dispatch(getCheckInDate(checkInDate)),
  getCheckOutDate: (checkOutDate) => dispatch(getCheckOutDate(checkOutDate)),
  getCity: (city) => dispatch(getCity(city)),
});

export const FormHotel = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormHotelComponent);
