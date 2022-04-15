import { Card } from "antd";

const { Meta } = Card;
export const BookingCard = (props: any) => {
  const hotel = props.data;

  const dateArrival = new Date(hotel.dateArrival).toLocaleDateString();
  const dateDeparture = new Date(hotel.dateDeparture).toLocaleDateString();

  return (
    <Card
      title={hotel.name}
      hoverable
      style={{ width: 340 }}
      cover={<img alt="hotel" src={hotel.image} />}
    >
      <Meta title={hotel.address} description={hotel.city} />
      <Meta
        title={`Посетители: ${hotel.adult} взрослых и ${hotel.child} детей `}
      />
      <Meta
        title={`${dateArrival || "-"} – ${dateDeparture || "0"} (${
          hotel.days || "-"
        } д.)`}
        description={`Итого: ${hotel.sum || "0"}`}
      />
    </Card>
  );
};
