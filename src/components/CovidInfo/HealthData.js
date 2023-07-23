import ChildMortalityRates from "../HealthData/ChildMortalityRates";
import HealthExpenditures from "../HealthData/HealthExpenditures";
import LifeExpectancy from "../HealthData/LifeExpectancy";
import PublicDebt from "../MacroeconomicData/PublicDebt";
import SocialDevelopmentIndicators from "../MacroeconomicData/SocialDevelopmentIndicators";
import Unemployment from "../MacroeconomicData/Unemployment";

const MacroeconomicData = (country) => {
  console.log(country, "macroeie data");
  return (
    <>
      <ChildMortalityRates
        iso={country.iso}
        optionSelected={country.optionSelected}
      />
      <HealthExpenditures
        iso={country.iso}
        optionSelected={country.optionSelected}
      />
      <LifeExpectancy
        iso={country.iso}
        optionSelected={country.optionSelected}
      />
    </>
  );
};

export default MacroeconomicData;
