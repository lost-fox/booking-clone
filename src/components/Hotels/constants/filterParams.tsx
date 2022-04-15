import { Guests } from "../components/Guests/index";
import { DateLeave } from "../components/Dates/DateLeave";
import { DateArrive } from "../components/Dates/DateArrive";
import { Rules } from "../components/Rules";
import { Comfortables } from "../components/Comfortables";

export const filterComponents = [
  <DateArrive />,
  <DateLeave />,
  <Guests />,
  <Comfortables />,
  <Rules />,
];
export const guestSelect = ["взрослые", "дети"];
