import React, { useState } from "react";

export const SettingsContext = React.createContext();

let initialState = {
  price: [0, 100000],
};

export const SettingsContainer = (props) => {
  const [state, setState] = useState(initialState);

  const setPrice = (min, max) => {
    setState((prevState) => {
      return {
        ...prevState,
        price: [min, max],
      };
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        price: state.price,
        setPrice: setPrice,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
