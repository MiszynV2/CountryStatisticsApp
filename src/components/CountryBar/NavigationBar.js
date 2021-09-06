import { useState } from "react";
import CountryList from "./Countrylist";
import SearchForm from "./SearchForm";
import classes from"./NavigationBar.module.css"


const NavigationBar = ({list,onClick}) => {
  const [inputInfo, setInputInfo] = useState("");

  return (
    <nav className={classes.navbar}>
      <SearchForm onInputChange={setInputInfo} />
      <CountryList
        onClick={onClick}
        countries={list}
        inputValue={inputInfo}
      />
    </nav>
  );
};

export default NavigationBar;
