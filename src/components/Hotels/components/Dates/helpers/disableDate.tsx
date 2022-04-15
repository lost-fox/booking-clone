import moment, { Moment } from "moment";
import { getDateArriveStr } from "../DateArrive";
import { getDateLeaveStr } from "../DateLeave";

export const disabledDateLeave = (current: Moment) =>
  current && current < moment(getDateLeaveStr(), "YYYY-MM-DD");

export const disabledDateArrive = (current: Moment) =>
  current && current < moment(getDateArriveStr(), "YYYY-MM-DD");
