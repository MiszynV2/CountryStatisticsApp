import CountryInformation from "./CovidInfo/CountryInformation";
import MacroeconomicData from "./CovidInfo/MacroeconomicData";
import EducationData from "./CovidInfo/EducationData";
import { useState } from "react";

const CountryInfo = ({ country }) => {
  const [optionSelected, setOptionSelected] = useState("EducationData");

  const handleOptionClick = (option) => {
    setOptionSelected(option);
  };

  return (
    <>
      <div>
        <button onClick={() => handleOptionClick("EducationData")}>
          EducationData
        </button>
        <button onClick={() => handleOptionClick("MacroeconomicData")}>
          Macroeconomic Data
        </button>
      </div>

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
    </>
  );
};

export default CountryInfo;
