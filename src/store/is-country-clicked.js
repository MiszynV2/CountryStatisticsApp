import React from "react";

const CountryClickedContext = React.createContext({
  isCountryClicked: false,
  code: "",
});

export default CountryClickedContext;
