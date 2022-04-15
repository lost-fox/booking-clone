import "./style.css";
import MapContainer from "./map-container";
import ModalForm from "./modal-booking";
import { Suspense, useEffect, useState } from "react";

const InnerRight = (props: any) => {
  if (!props.data.location) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <div className="inner-right">
        {/* <MapContainer
          lng={props.data.location.longitude}
          lat={props.data.location.latitude}
        /> */}
        <ModalForm data={props.data} />
      </div>
    </Suspense>
  );
};

export default InnerRight;
