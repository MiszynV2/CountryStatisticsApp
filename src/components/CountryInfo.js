import CountryCovidInfo from "./CovidInfo/CountryCovidInfo";
import CountryDetail from "./CountryInfo/CountryDetail";
import TotalCountryStatistics from "./CovidInfo/TotalCountryStatistics";
import VaccinationStatisticsInCountry from "./CovidInfo/VaccinationStatisticsInCountry";
import ContinentStatistics from "./CovidInfo/ContinentStatistics";
import classes from './CountryInfo.module.css'
const CountryInfo = ({country}) => {
    return (
        <>
            <CountryCovidInfo code={country.code} name={country.name} />
            <ContinentStatistics/>
            <VaccinationStatisticsInCountry/>
            <TotalCountryStatistics/>
        </>


    )
}
/*<CountryDetail country={country}/>*/
export default CountryInfo