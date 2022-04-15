import "./style.css";
import { Image } from "antd";
import React from "react";

interface ImageURL {
  urlPhoto: string;
}

const ImageHotel = (props: ImageURL) => {
  return (
    <Image
      width={"100%"}
      height={"100%"}
      src={props.urlPhoto}
      preview={false}
    />
  );
};

export default ImageHotel;
