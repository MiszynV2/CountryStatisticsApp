import CountryCovidInfo from "./CovidInfo/CountryCovidInfo";
import CountryDetail from "./CountryInfo/CountryDetail";

const CountryInfo = ({country}) => {
    return (
       <div>
           <CountryDetail country={country}/>
           <CountryCovidInfo code={country.code} name={country.name} />
       </div>
    )
}

export default CountryInfo