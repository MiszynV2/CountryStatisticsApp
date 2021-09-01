import AllCountriesInfo from "./AllCountriesInfo";
import CountryCovidInfo from "./CountryCovidInfo";
import classes from "./GeneralInfo.module.css";

const GeneralInfo = ({ data }) => {
  return (
    <div className={classes.main}>
      <div className={classes.info}>
        {!data.code || !data.name ? (
          <AllCountriesInfo />
        ) : (
          <CountryCovidInfo code={data.code} name={data.name} />
        )}
      </div>
    </div>
  );
};
export default GeneralInfo;
