import "./style.css";
import { Avatar, Button, Form, Input, Modal } from "antd";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { BookingCard } from "./components/BookingCard";
import { UploadPhoto } from "./components/UploadPhoto";
import { FavoriteHotelCard } from "./components/FavoriteHotelCard";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { GetUserDataResponse } from "../../api/getUserData.api";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hooks";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Profile = () => {
  const { request } = useHttp();
  const user = useSelector<AppState, GetUserDataResponse | null>(
    (state) => state.usersData.user
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [forms, setForm] = useState({
    email: user?.email,
    name: user?.name,
    surname: user?.surname,
    phone: user?.phone,
  });

  const changeHandler = (event: {
    target: { name: string; value: string };
  }) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const changeUserDataHandler = async () => {
    try {
      const url = `https://rsclone-server.herokuapp.com/user/${user?._id}`;
      await request(url, "PATCH", { ...forms });
      setIsModalVisible(false);
      document.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const url = `https://rsclone-server.herokuapp.com/user/${user?._id}`;
      await request(url, "DELETE");
      setIsModalVisible(false);
      document.location.reload();
      localStorage.removeItem("UserData");
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = () => {
    Modal.confirm({
      title: "Внимание!",
      icon: <ExclamationCircleOutlined />,
      content: "Вы точно хотите удалить свой аккаунт?",
      okText: "Да",
      cancelText: "Нет",
      onOk() {
        deleteUser();
      },
    });
  };

  const [form] = Form.useForm();

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-info">
          <div className="user-avatar">
            <Avatar
              size={300}
              icon={<UserOutlined />}
              style={{ marginBottom: "20px" }}
            />
            {/* <UploadPhoto /> */}
          </div>
          <div className="user-info">
            <div className="greeting">
              Здравствуйте, {user?.name}! Рады видеть вас!
            </div>
            <div className="wrapper-info">
              <div className="info-block">
                <span className="info-name">Имя</span>
                <input
                  type="text"
                  className="info-input"
                  disabled
                  placeholder={user?.name}
                />
              </div>
              <div className="info-block">
                <span className="info-name">Фамилия</span>
                <input
                  type="text"
                  className="info-input"
                  disabled
                  placeholder={user?.surname}
                />
              </div>
              <div className="info-block">
                <span className="info-name">Номер телефона</span>
                <input
                  type="text"
                  className="info-input"
                  disabled
                  placeholder={user?.phone}
                />
              </div>
              <div className="info-block last-info-block">
                <span className="info-name">E-mail</span>
                <input
                  type="text"
                  className="info-input"
                  disabled
                  placeholder={user?.email}
                />
              </div>
              <Button type="primary" className="change-btn" onClick={showModal}>
                Изменить
              </Button>
              <Button type="primary" danger onClick={confirm}>
                Удалить аккаунт
              </Button>
              <Modal
                title="Редактировать данные"
                visible={isModalVisible}
                onOk={changeUserDataHandler}
                onCancel={handleCancel}
              >
                <Form
                  {...formItemLayout}
                  form={form}
                  name="changeUserData"
                  className="registration__form"
                  scrollToFirstError
                >
                  <Form.Item
                    name="name"
                    label="Имя"
                    rules={[
                      {
                        message: "Пожалуйста, введите свое имя!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      name="name"
                      placeholder="Введите имя"
                      onChange={changeHandler}
                    />
                  </Form.Item>
                  <Form.Item
                    name="surname"
                    label="Фамилия"
                    rules={[
                      {
                        message: "Пожалуйста, введите свою фамиилю!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      name="surname"
                      placeholder="Введите фамилию"
                      onChange={changeHandler}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "Некорректный E-mail!",
                      },
                      {
                        message: "Введите E-mail!",
                      },
                    ]}
                  >
                    <Input
                      name="email"
                      placeholder="Введите E-mail"
                      onChange={changeHandler}
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Номер телефона"
                    rules={[{ message: "Введите номер телефона!" }]}
                  >
                    <Input
                      name="phone"
                      placeholder="Введите номер телефона"
                      style={{ width: "100%" }}
                      onChange={changeHandler}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>

        <div className="booking-info">
          <span className="info-title">Ваши бронирования:</span>
          <div className="booking-cards-container">
            {user?.bookHotels?.length === 0
              ? "Вы еще не забронировали отель"
              : user?.bookHotels?.map((hotel) => {
                  return <BookingCard data={hotel} />;
                })}
          </div>
        </div>
        <div className="booking-info">
          <span className="info-title">Избранное:</span>
          <div className="favorite-hotels-cards">
            {user?.favoriteHotels?.length === 0
              ? "Вы еще не добавили отели в избранное"
              : user?.favoriteHotels?.map((hotel) => {
                  return (
                    <FavoriteHotelCard
                      id={hotel.hotelId}
                      image={hotel.image}
                      key={hotel}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
