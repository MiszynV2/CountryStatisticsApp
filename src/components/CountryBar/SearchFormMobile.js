import React, { useState, useEffect } from "react";
import Select from "react-select";
import classes from "./SearchFormMobile.module.css";

const SearchFormMobile = (props) => {
  const [value, setValue] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedCountries = data.map((country) => ({
        label: country.name.common,
        value: country.name.common.toLowerCase(),
        iso: country.cca2,
      }));
      setCountriesList(loadedCountries);
      setFilteredCountries(loadedCountries);
    } catch (error) {
      console.error(error);
    }
  };

  const filterCountries = (inputValue) => {
    return countriesList.filter((country) =>
      country.label.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  };

  const onCountryInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setValue(newValue);
    setFilteredCountries(filterCountries(inputValue));
  };

  const onCountryChange = (selectedOption) => {
    setValue(selectedOption);
    if (selectedOption) {
      props.onInputSelected({
        slug: selectedOption.value,
        iso: selectedOption.iso,
      });
    } else {
      // Handle clearing the selected option if needed
    }
  };

  return (
    <form className={classes.input_form}>
      <Select
        value={value}
        onChange={onCountryChange}
        onInputChange={onCountryInputChange}
        options={filteredCountries}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        placeholder="Select country"
        isClearable
      />
    </form>
  );
};

export default SearchFormMobile;
