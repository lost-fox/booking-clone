import { useState } from "react";
import { connect } from "react-redux";
import {
  AppDispatch,
  AppState,
  getAdultsNum,
  getChildNum,
} from "../../../../store";
import {
  MAX_COUNT,
  MIN_COUNT,
  selectOptions,
} from "./constants/selectConstants";
import { createSelectText } from "./helpers/createSelectText";
import { DispatchProps, StateProps } from "./interfaces/propsInterfaces";
import { SelectComponentProps } from "./types/propsTypes";

export const SelectComponent: React.FC<SelectComponentProps> = (props) => {
  const { adultsNum, childNum } = props;
  const [selectState, setSelectState] = useState<boolean>(false);

  return (
    <>
      <div className="filter-info">
        <span className="filter-info-text">
          {createSelectText([adultsNum, childNum], selectOptions)}
        </span>
        <button
          className="change-filter-btn change-filter-person"
          onClick={() => setSelectState(!selectState)}
        ></button>
      </div>
      <div className={`comfortables-select ${!selectState ? "hidden" : ""}`}>
        {selectOptions.map((value, index) => (
          <div className="comfortables-option" key={index}>
            <span className="comfortable-name">{value}</span>
            <div className="comf-counter">
              <div
                className="comf-btn less-btn"
                onClick={() => {
                  if (index && childNum > MIN_COUNT)
                    props.getChildNum(childNum - 1);
                  if (adultsNum > MIN_COUNT && !index)
                    props.getAdultsNum(adultsNum - 1);
                }}
              >
                -
              </div>
              <div className="comf-count">{[adultsNum, childNum][index]}</div>
              <div
                className="comf-btn more-btn"
                onClick={() => {
                  if (index && childNum < MAX_COUNT)
                    props.getChildNum(childNum + 1);
                  if (adultsNum < MAX_COUNT && !index)
                    props.getAdultsNum(adultsNum + 1);
                }}
              >
                +
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  adultsNum: state.filtersData.adultsNum,
  childNum: state.filtersData.childNum,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getAdultsNum: (adultsNum) => dispatch(getAdultsNum(adultsNum)),
  getChildNum: (childNum) => dispatch(getChildNum(childNum)),
});

export const Select = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectComponent);
