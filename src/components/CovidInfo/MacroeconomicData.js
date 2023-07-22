//import classes from "./CovidInfoListItem.module.css";
import ForeignTrade from "../MacroeconomicData/ForeignTrade";
import GDPInfo from "../MacroeconomicData/GDPInfo";
import Inflation from "../MacroeconomicData/InflationInfo";
import PublicDebt from "../MacroeconomicData/PublicDebt";
import SocialDevelopmentIndicators from "../MacroeconomicData/SocialDevelopmentIndicators";
import Unemployment from "../MacroeconomicData/Unemployment";

const MacroeconomicData = (country) => {
  console.log(country, "macroeie data");
  return (
    <>
      <ForeignTrade iso={country.iso} optionSelected={country.optionSelected} />
      <GDPInfo iso={country.iso} optionSelected={country.optionSelected} />
      <Inflation iso={country.iso} optionSelected={country.optionSelected} />
      <PublicDebt iso={country.iso} optionSelected={country.optionSelected} />
      <SocialDevelopmentIndicators
        iso={country.iso}
        optionSelected={country.optionSelected}
      />
      <Unemployment iso={country.iso} optionSelected={country.optionSelected} />
    </>
  );
};

export default MacroeconomicData;
