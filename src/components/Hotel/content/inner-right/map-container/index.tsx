import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2s4LXBsIiwiYSI6ImNrdnF5MWkzbDAybHMycG05YWtjeGl3MWUifQ.sZhc173ucmr_lRfVw7Ww6w";

interface MapCenter {
  lng: number;
  lat: number;
}

const MapContainer = (props: MapCenter) => {
  const [lng] = useState(props.lng);
  const [lat] = useState(props.lat);
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken:
        "pk.eyJ1Ijoic2s4LXBsIiwiYSI6ImNrdnF5MWkzbDAybHMycG05YWtjeGl3MWUifQ.sZhc173ucmr_lRfVw7Ww6w",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 17,
    });

    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, [lat, lng]);
  return (
    <div className="inner-map">
      <div ref={mapNode} className="map-container" />
    </div>
  );
};

export default MapContainer;
