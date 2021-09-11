import classes from "./CountryItem.module.css";
const CountryItem = ({onCountryClick, country,searchPhrase}) => {
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
                          <span className={classes.searchedPhrase}>{country.country.split('').splice(0, searchPhrase.length).join('')}</span>
                            {country.country.split('').splice(searchPhrase.length, country.country.length -1).join('')}</span>
                    ) : <span className={classes.searchedText}>{country.country}</span>}

                </li>

            );
            };
            export default CountryItem;
