export interface StateProps {
  adultsNum: number;
  childNum: number;
}
export interface DispatchProps {
  getAdultsNum: (adultsNum: number) => Promise<void>;
  getChildNum: (childNum: number) => Promise<void>;
}
