import CountryItem from "./CountryItem";
import classes from "./CountryList.module.css";

const CountryList = (props) => {
  const filterInputCountries = props.countries.filter((country) =>
    country.name.toLowerCase().includes(props.inputValue)
  );

  console.log(filterInputCountries);
  return (
    <div className={classes.card} code={props.code} name={props.name}>
      <ul className={classes.list}>
        {!filterInputCountries || filterInputCountries === ""
          ? props.countries.map((country) => (
              <>
                <CountryItem
                  onCountryClick={props.onCountryClick}
                  key={country.id}
                  {...country}
                />
              </>
            ))
          : filterInputCountries.map((country) => (
              <>
                <CountryItem
                  onCountryClick={props.onCountryClick}
                  key={country.id}
                  {...country}
                />
              </>
            ))}
      </ul>
    </div>
  );
};
export default CountryList;
