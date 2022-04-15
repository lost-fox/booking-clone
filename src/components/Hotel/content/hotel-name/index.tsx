import "./style.css";

interface HotelNameStr {
  name: string;
}

const HotelName = ({ name }: HotelNameStr) => {
  return <h2 className="hotel-title">{name}</h2>;
};

export default HotelName;
