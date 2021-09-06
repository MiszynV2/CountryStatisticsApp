import CountryItem from "./CountryItem";
import classes from "./CountryList.module.css";

const CountryList = ({
                         inputValue,
                         onClick,
                         countries,
                         code,
                         name
                     }) => {
    const filterInputCountries = countries.filter((country) => {
        if (!inputValue) return country

        return country.name.toLowerCase().includes(inputValue)
    });

    return (
            <ul className={classes.list}>
                {filterInputCountries.map((country) => (
                    <>
                        <CountryItem
                            onCountryClick={onClick}
                            key={country.id}
                            country={country}
                        />
                    </>
                ))}
            </ul>
    );
};
export default CountryList;
