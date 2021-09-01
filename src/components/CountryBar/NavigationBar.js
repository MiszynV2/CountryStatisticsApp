import { useState } from "react";
import CountryList from "./Countrylist";
import SearchForm from "./SearchForm";

const NavigationBar = (props) => {
  const [inputInfo, setInputInfo] = useState("");
  const ChangeInfoHandler = (input) => {
    setInputInfo(input);
  };
  console.log(inputInfo);
  return (
    <>
      <SearchForm onInputChange={ChangeInfoHandler} />
      <CountryList
        onCountryClick={props.onCountryClick}
        countries={props.countries}
        inputValue={inputInfo.toLowerCase()}
      />
    </>
  );
};

export default NavigationBar;
