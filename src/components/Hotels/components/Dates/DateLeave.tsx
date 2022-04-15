import { DatePicker } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { AppDispatch, AppState, getCheckOutDate } from "../../../../store";
import { disabledDateLeave } from "./helpers/disableDate";

interface StateProps {
  checkOutDate: string;
}
interface DispatchProps {
  getCheckOutDate: (checkOutDate: string) => Promise<void>;
}

type DateLeaveProps = StateProps & DispatchProps;

export const getDateLeaveStr = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate() + 2}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateLeaveComponent: React.FC<DateLeaveProps> = (props) => {
  props.getCheckOutDate(props.checkOutDate || getDateLeaveStr());
  return (
    <>
      <span className="filter-title">дата выезда</span>
      <DatePicker
        defaultValue={moment(
          new Date(props.checkOutDate || getDateLeaveStr()),
          "YYYY-MM-DD"
        )}
        format="YYYY-MM-DD"
        size="large"
        className="date-block"
        placeholder="Выбрать дату"
        disabledDate={disabledDateLeave}
        onChange={(date, dateString) => {
          props.getCheckOutDate(dateString);
        }}
      />
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  checkOutDate: state.filtersData.checkOutDate,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCheckOutDate: (checkOutDate) => dispatch(getCheckOutDate(checkOutDate)),
});

export const DateLeave = connect(
  mapStateToProps,
  mapDispatchToProps
)(DateLeaveComponent);
