import CountryInformation from "./CovidInfo/CountryInformation";
import TotalCountryPopulation from "./CovidInfo/TotalCountryPopulation";
import TotalCountryPKB from "./CovidInfo/TotalCountryPKB";
import TotalCountryRecorvered from "./CovidInfo/TotalCountryUrbanization";

const CountryInfo = ({ country }) => {
  return (
    <>
      <CountryInformation
        slug={country.slug}
        name={country.country}
        iso={country.iso}
      />
      <TotalCountryRecorvered
        name={country.slug}
        fullname={country.country}
        iso={country.iso}
      />
      <TotalCountryPKB
        name={country.slug}
        fullname={country.country}
        iso={country.iso}
      />
      <TotalCountryPopulation
        name={country.slug}
        fullname={country.country}
        iso={country.iso}
      />
    </>
  );
};
/*<CountryDetail country={country}/>*/
export default CountryInfo;
