import classes from "./CountryItem.module.css";
const CountryItem = ({onCountryClick, country}) => {
    const {flag, name, code} = country
    return (
                <li
                    code={code}
                    onClick={() => {
                        onCountryClick(country);
                    }}
                    className={classes.country}
                    role="button"
                    title={name}
                >
                    <img alt={''} className={classes.flag} src={flag}/>

                    {name}
                </li>

            );
            };
            export default CountryItem;
