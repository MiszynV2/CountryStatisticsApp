import CountryInformation from "./CovidInfo/CountryInformation";
import CountryDetail from "./CountryInfo/CountryDetail";
import TotalCountryStatistics from "./CovidInfo/TotalCountryStatistics";
import TotalCountryDeaths from "./CovidInfo/TotalCountryDeaths";
import TotalCountryRecorvered from "./CovidInfo/TotalCountryRecorvered";
import classes from "./CountryInfo.module.css";
const CountryInfo = ({ country }) => {
  console.log("aaaaaaaaaaa", country);
  return (
    <>
      <CountryInformation
        slug={country.slug}
        name={country.country}
        iso={country.iso}
      />
      <TotalCountryRecorvered name={country.slug} fullname={country.country} />
      <TotalCountryDeaths name={country.slug} fullname={country.country} />
      <TotalCountryStatistics name={country.slug} fullname={country.country} />
    </>
  );
};
/*<CountryDetail country={country}/>*/
export default CountryInfo;
