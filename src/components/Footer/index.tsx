import { useEffect } from "react";
import { connect } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { getHotelsByLocationData } from "../../store/hotelsByLocation/actiont";
import "./style.css";

interface StateProps {
  hotelsByLocation: any;
}
interface DispatchProps {
  getHotelsByLocationData: () => Promise<void>;
}

type FooterProps = StateProps & DispatchProps;

const Footer: React.FC<FooterProps> = (props) => {
  const { hotelsByLocation, getHotelsByLocationData: getData } = props;
  useEffect(() => {
    getData();
  }, [getData]);

  let latitude: number;
  let longitude: number;

  const success = (pos: any) => {
    const crd = pos.coords;
    latitude = crd.latitude;
    longitude = crd.longitude;
    localStorage.setItem("latitude", latitude.toString());
    localStorage.setItem("longitude", longitude.toString());
  };

  const error = async () => {
    latitude = 48.85341;
    longitude = 2.3488;
    localStorage.setItem("latitude", latitude.toString());
    localStorage.setItem("longitude", longitude.toString());
  };

  const geo = navigator.geolocation;
  geo.getCurrentPosition(success, error);

  return (
    <div className="footer">
      <div className="container flex">
        <a className="rssschool" href="https://rs.school/"></a>
        <div className="github">
          <a className="link-git" href="https://github.com/sk8-pl">
            Sk8-pl
          </a>
          <a className="link-git" href="https://github.com/annaignatova">
            AnnaIgnatova
          </a>
          <a className="link-git" href="https://github.com/lost-fox">
            Lost-fox
          </a>
        </div>
        <p className="year">2022</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  hotelsByLocation: state.hotelsByLocationData.hotelsByLocation,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getHotelsByLocationData: () => dispatch(getHotelsByLocationData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
