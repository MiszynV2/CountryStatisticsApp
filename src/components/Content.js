import classes from "./Content.module.css";
import AllCountriesInfo from "./CovidInfo/AllCountriesInfo";
import CountryInfo from "./CountryInfo";

export const Content = ({ country }) => {
  console.log("Content country props", country);
  return (
    <section className={classes.main}>
      {!country ? <AllCountriesInfo /> : <CountryInfo country={country} />}
    </section>
  );
};
