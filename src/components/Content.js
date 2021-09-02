import classes from "./Content.module.css"
import AllCountriesInfo from "./CovidInfo/AllCountriesInfo";
import CountryInfo from "./CountryInfo";

export const Content = ({country}) => {
    return (
        <main className={classes.main}>
            {!country ? <AllCountriesInfo/> : <CountryInfo country={country}/>}
        </main>
    )
}