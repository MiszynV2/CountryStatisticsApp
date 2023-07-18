import AutoSuggest from "react-autosuggest";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import classes from "./SearchFormMobile.module.css";

const SearchFormMobile = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedCountries = data.map((country) => ({
        name: country.name.common.toLowerCase(),
        slug: country.altSpellings[1],
        iso: country.cca2,
      }));
      setCountriesList(loadedCountries);
      setSuggestions(loadedCountries);
    } catch (error) {
      // TODO: handle errors properly
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  function getSuggestions(value) {
    return countriesList.filter((country) =>
      country.slug.slice(0, value.length).includes(value.trim().toLowerCase())
    );
  }

  return (
    <>
      <form className={classes["input_form"]}>
        <AutoSuggest
          suggestions={suggestions || countriesList}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setValue(value);
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionSelected={
            (_, { suggestionValue, suggestionIndex }) => {
              props.onInputSelected({
                slug: suggestionValue,
                iso: suggestions[suggestionIndex].iso,
              });
            }
            //props.onInputChange()
          }
          getSuggestionValue={(suggestion) => suggestion.slug}
          renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
          inputProps={{
            placeholder: "Select country",
            value: value,
            onChange: (_, { newValue, method }) => {
              setValue(newValue);
            },
          }}
          theme={{
            container: classes.react_autosuggest__container,
            input: classes.react_autosuggest__input,
            inputOpen: classes.react_autosuggest__input__open,
            inputFocused: classes.react_autosuggest__input__focused,
            suggestionsContainer:
              classes.react_autosuggest__suggestions_container,
            suggestionsContainerOpen:
              classes.react_autosuggest__suggestions_container__open,
            suggestionsList: classes.react_autosuggest__suggestions_list,
            suggestion: classes.react_autosuggest__suggestion,
            suggestionHighlighted:
              classes.react_autosuggest__suggestion__highlighted,
          }}
          highlightFirstSuggestion={true}
        />
      </form>
    </>
  );
};
export default SearchFormMobile;
