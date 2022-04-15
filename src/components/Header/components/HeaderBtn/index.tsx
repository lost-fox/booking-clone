import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import "./style.css";

const signOut = () => {
  localStorage.removeItem("UserData");
  document.location.reload();
};

export const HeaderBtn = (props: any) => {
  if (!!props.data) {
    return (
      <div className="header-btns">
        <div className="header-user-name">
          Здравствуйте, <b>{props.data.name}</b>{" "}
        </div>
        <Link to="/profile">
          <Avatar
            size={42}
            icon={<UserOutlined />}
            style={{ marginRight: 20 }}
          />
        </Link>
        <Link className="header-btn sign-out" to="/" onClick={signOut}>
          Выйти
        </Link>
      </div>
    );
  }

  return (
    <div className="header-btns">
      <Link className="header-btn sign-in" to="/sign-in">
        войти
      </Link>
      <Link className="header-btn sign-up" to="/registration">
        зарегистрироваться
      </Link>
    </div>
  );
};
