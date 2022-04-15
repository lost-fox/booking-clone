import "./style.css";
import { Progress, Divider } from "antd";

interface HotelNameStr {
  score: number;
  scoreText: string;
}

const RoomRating = (props: HotelNameStr) => {
  return (
    <div className="room-rating">
      <Divider orientation="left">Рейтинг отеля</Divider>
      <div>
        <div className="plug-rating">
          {props.score ? (
            <>
              <Progress
                type="circle"
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={props.score * 10}
                showInfo={true}
                format={() => `${props.score}`}
              />
              <div className="score-text">{props.scoreText}</div>
            </>
          ) : (
            <div className="score-text">Информация о рейтинге отсутствует</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomRating;
