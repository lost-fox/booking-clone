import { connect } from "react-redux";
import { AppDispatch, AppState, getRooms } from "../../../../store";
import "./style.css";

interface StateProps {
  rooms: number;
}
interface DispatchProps {
  getRooms: (rooms: number) => Promise<void>;
}

type ComfortablesComponentProps = StateProps & DispatchProps;

export const ComfortablesComponent: React.FC<ComfortablesComponentProps> = (
  props
) => {
  const { rooms, getRooms } = props;
  return (
    <>
      <span className="filter-title filter-title-select">
        количество комнат
      </span>
      <div className="comf-counter rooms-counter">
        <button
          className="comf-btn"
          onClick={() => {
            if (rooms > 1) getRooms(rooms - 1);
          }}
        >
          -
        </button>
        <div className="comf-count">{rooms}</div>
        <button
          className="comf-btn"
          onClick={() => {
            if (rooms < 29) getRooms(rooms + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  rooms: state.filtersData.rooms,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getRooms: (rooms) => dispatch(getRooms(rooms)),
});

export const Comfortables = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComfortablesComponent);
