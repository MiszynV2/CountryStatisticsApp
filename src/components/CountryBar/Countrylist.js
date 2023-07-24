import React from "react";
import CountryItem from "./CountryItem";
import classes from "./CountryList.module.css";

const CountryList = ({ onClick, countries, searchPhrase, totalPages }) => {
  return (
    <div className={classes.listWrapper}>
      <ul className={classes.list}>
        {countries.map((country) => (
          <CountryItem
            flagsvg={country.flagsvg}
            onCountryClick={onClick}
            key={country.iso}
            country={country}
            searchPhrase={searchPhrase}
          />
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
