import CountryInformation from "./CovidInfo/CountryInformation";
import MacroeconomicData from "./CovidInfo/MacroeconomicData";
import EducationData from "./CovidInfo/EducationData";
import HealthData from "./CovidInfo/HealthData";
import { useState } from "react";
import classes from "./CountryInfo.module.css";

const CountryInfo = ({ country }) => {
  const [optionSelected, setOptionSelected] = useState("EducationData");

  const handleOptionClick = (option) => {
    setOptionSelected(option);
  };

  return (
    <>
      <div className={classes.buttonWrapper}>
        <button
          className={`${classes.button} ${
            optionSelected === "EducationData" ? classes.activeButton : ""
          }`}
          onClick={() => handleOptionClick("EducationData")}
        >
          EducationData
        </button>
        <button
          className={`${classes.button} ${
            optionSelected === "MacroeconomicData" ? classes.activeButton : ""
          }`}
          onClick={() => handleOptionClick("MacroeconomicData")}
        >
          Macroeconomic Data
        </button>
        <button
          className={`${classes.button} ${
            optionSelected === "HealthData" ? classes.activeButton : ""
          }`}
          onClick={() => handleOptionClick("HealthData")}
        >
          Health Data
        </button>
      </div>

      {/* Pozostała część komponentu bez zmian */}
      {optionSelected === "EducationData" && (
        <>
          <CountryInformation iso={country.iso} />
          <EducationData iso={country.iso} optionSelected={optionSelected} />
        </>
      )}

      {optionSelected === "MacroeconomicData" && (
        <>
          <CountryInformation iso={country.iso} />
          <MacroeconomicData
            iso={country.iso}
            optionSelected={optionSelected}
          />
        </>
      )}

      {optionSelected === "HealthData" && (
        <>
          <CountryInformation iso={country.iso} />
          <HealthData iso={country.iso} optionSelected={optionSelected} />
        </>
      )}
    </>
  );
};

export default CountryInfo;
