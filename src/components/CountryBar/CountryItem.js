import { image } from "d3";
import classes from "./CountryItem.module.css";
const CountryItem = ({ onCountryClick, country, searchPhrase }) => {
  //console.log(country, "countrytem");
  const countryNameSplit = country.name.split("");
  const countryFirstLetterUp = countryNameSplit[0].toUpperCase();
  countryNameSplit[0] = countryNameSplit[0].toUpperCase();
  return (
    <li
      onClick={() => {
        onCountryClick(country);
      }}
      className={classes.country}
      role="button"
      title={country.country}
    >
      {searchPhrase.length > 0 ? (
        <span className={classes.searchedText}>
          <img
            className={classes.flagsvg}
            alt={country.name + " flag"}
            src={country.flagsvg}
          />
          <span className={classes.searchedPhrase}>
            {countryNameSplit.splice(0, searchPhrase.length).join("")}
          </span>
          {country.name
            .split("")
            .splice(searchPhrase.length, country.name.length - 1)
            .join("")}
        </span>
      ) : (
        <>
          <img
            className={classes.flagsvg}
            alt={country.name + " flag"}
            src={country.flagsvg}
          />
          <span className={classes.searchedText}>{countryNameSplit}</span>
        </>
      )}
    </li>
  );
};
export default CountryItem;
