import "./style.css";
import { useState } from "react";
import { Form, Button, Spin } from "antd";
import { tailFormItemLayout } from "../../../../constants/tailForm";
import { useParams } from "react-router";
import { AppState, InitialFiltersState } from "../../../../../../store";
import { useSelector } from "react-redux";
import { useHttp } from "../../../../../../hooks/http.hooks";
import { json } from "express";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const FormBooking = (props: any) => {
  const data = props.data;
  const { request } = useHttp();
  const { id } = useParams();
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const filterData = useSelector<AppState, InitialFiltersState | null>(
    (state) => state.filtersData
  );

  if (!filterData) return <Spin></Spin>;

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const checkOutDate = new Date(filterData.checkOutDate);
  const checkInDate = new Date(filterData.checkInDate);

  const imageHotel = localStorage.getItem("imgHotel");

  let priceDay = data.minrate;
  if (!priceDay) priceDay = 0;
  let valueDays = Math.round(
    (checkOutDate.getTime() - checkInDate.getTime()) / 86400000
  );
  if (!valueDays) valueDays = 0;
  const discount = priceDay * valueDays * 0.05;
  const allSum = priceDay * valueDays * filterData.rooms;
  const extraService = allSum * 0.1;
  const total = allSum - discount + extraService;

  const bookHotel = async () => {
    try {
      const user = localStorage.getItem("UserData");
      if (!user) return;
      const userId = JSON.parse(user).userId;
      await request(`http://localhost:8080/user/${userId}/bookHotels`, "POST", {
        image: imageHotel,
        name: data.name,
        dateArrival: checkInDate,
        dateDeparture: checkOutDate,
        days: valueDays,
        sum: total,
        city: data.city,
        address: data.address,
        adult: filterData.adultsNum,
        child: filterData.childNum,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
    >
      <div className="form-header">
        <div
          className="image-form"
          style={{ backgroundImage: `url(${imageHotel})` }}
        ></div>

        {/* <h2 className="form-header__right">{priceDay}₽ в сутки</h2> */}
      </div>
      <div className="book-detail-description">
        <h2 className="form-header__left">
          {data.name} <b>{data.city}</b>
        </h2>
        <div className="date-booking">
          Дата заезда: {filterData.checkInDate} <br />
          Дата выезда: {filterData.checkOutDate}
        </div>
        <Form.Item>
          <div className="price-container">
            <div className="price">
              {`Стоимость: ${priceDay}₽ x ${valueDays} суток x ${filterData.rooms} комнаты`}
            </div>
            <div className="price-total">{allSum}₽</div>
          </div>
        </Form.Item>
        Взрослые: {filterData.adultsNum} <br></br>
        Дети: {filterData.childNum} <br></br>
        <Form.Item>
          <div className="price-container">
            <div className="price-discount">Сбор за услуги: скидка 5%</div>
            <div className="discount-total">
              -{(priceDay * valueDays * 0.05).toFixed(2)}₽
            </div>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="price-container">
            <div className="price-discount">Сбор за дополнительные услуги</div>
            <div className="discount-total">{extraService}₽</div>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="price-container">
            <h3 className="price-discount">Итого</h3>
            <h3 className="discount-total">{total}₽</h3>
          </div>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={bookHotel}>
            Забронировать
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormBooking;
