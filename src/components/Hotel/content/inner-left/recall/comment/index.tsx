import "./style.css";
import { Comment, List } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Item from "antd/lib/list/Item";

const Commentary = () => {
  const [data, setData] = useState([
    {
      author: { name: "user" },
      pros: "qweqwe",
      cons: "qweqwe",
      avatar: "https://joeschmoe.io/api/v1/random",
    },
  ]);
  const { id } = useParams();
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(
          `https://booking-com.p.rapidapi.com/v1/hotels/reviews?locale=ru&sort_type=SORT_MOST_RELEVANT&hotel_id=${id}&language_filter=ru`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "booking-com.p.rapidapi.com",
              "x-rapidapi-key":
                "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
            },
          }
        );
        const json = await response.json();
        json.result.map((e: { avatar: string }) => {
          e.avatar = "https://joeschmoe.io/api/v1/random";
        });
        setData(
          json.result.filter(
            (e: { pros: string; cons: string }) => e.pros + e.cons != ""
          )
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchComment();
  });

  return (
    <List
      className="comment-list"
      header={`Последние ${
        data.length > 5 ? data.slice(0, 4).length : data.length
      } комментария`}
      itemLayout="horizontal"
      dataSource={data.length > 5 ? data.slice(0, 4) : data}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.author.name}
            avatar={item.avatar}
            content={item.pros + " " + item.cons}
          />
        </li>
      )}
    />
  );
};

export default Commentary;
