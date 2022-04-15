import { DatePicker } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { AppDispatch, AppState, getCheckInDate } from "../../../../store";
import { dateFormat } from "./constants/dateConstants";
import { disabledDateArrive } from "./helpers/disableDate";
import "./style.css";

interface StateProps {
  checkInDate: string;
}
interface DispatchProps {
  getCheckInDate: (checkInDate: string) => Promise<void>;
}

type DateArriveProps = StateProps & DispatchProps;

export const getDateArriveStr = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate() + 1}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateArriveComponent: React.FC<DateArriveProps> = (props) => {
  const { checkInDate, getCheckInDate } = props;
  getCheckInDate(checkInDate || getDateArriveStr());
  return (
    <>
      <span className="filter-title">дата заезда</span>
      <DatePicker
        defaultValue={moment(
          new Date(checkInDate || getDateArriveStr()),
          dateFormat
        )}
        format={dateFormat}
        size="large"
        className="date-block"
        placeholder="Выбрать дату"
        disabledDate={disabledDateArrive}
        onChange={(date, dateString) => {
          getCheckInDate(dateString);
        }}
      />
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  checkInDate: state.filtersData.checkInDate,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCheckInDate: (checkInDate) => dispatch(getCheckInDate(checkInDate)),
});

export const DateArrive = connect(
  mapStateToProps,
  mapDispatchToProps
)(DateArriveComponent);
