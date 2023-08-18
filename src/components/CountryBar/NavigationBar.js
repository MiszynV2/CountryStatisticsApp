import { useCallback, useEffect, useState } from "react";
import CountryList from "./Countrylist";
import SearchForm from "./SearchForm";
import classes from "./NavigationBar.module.css";
import useWindowSize from "../../services/useWindowSize";

const NavigationBar = ({ onClick }) => {
  const size = useWindowSize();
  const pageWidth = size.width;
  const pageHeight = size.height;
  let INIT_COUNTRY_PER_PAGE = Math.floor(pageHeight / 120);
  if (pageWidth > 1200) {
    INIT_COUNTRY_PER_PAGE = 10;
  } else {
    INIT_COUNTRY_PER_PAGE = 18;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [countriesListTotal, setCountriesListTotal] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

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
        flagsvg: country.flags.svg,
      }));
      setCountriesList(loadedCountries);
      setCountriesListTotal(loadedCountries);
      setTotalPages(
        Math.floor(loadedCountries.length / INIT_COUNTRY_PER_PAGE + 1)
      );
    } catch (error) {
      // TODO: handle errors properly
      console.error(error);
    }
  }, [INIT_COUNTRY_PER_PAGE]);

  const getFilteredInputCountries = (inputInfo) => {
    if (!inputInfo) {
      setCountriesList(countriesListTotal);
      setSearchPhrase("");
      setTotalPages(
        Math.floor(countriesListTotal.length / INIT_COUNTRY_PER_PAGE) + 1
      );
    } else setSearchPhrase(inputInfo);
    const filteredList = countriesListTotal.filter((country) => {
      const inputLength = inputInfo.length;
      setCurrentPage(1);
      return (
        country.name.slice(0, inputLength).toLowerCase() ===
        inputInfo.toLowerCase()
      );
    });

    setTotalPages(Math.floor(filteredList.length / INIT_COUNTRY_PER_PAGE) + 1);
    setCountriesList(filteredList);
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const ButtonUpHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const ButtonDownHandler = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav className={classes.navbar}>
      <SearchForm onInputChange={getFilteredInputCountries} />
      <CountryList
        onClick={onClick}
        searchPhrase={searchPhrase}
        countries={countriesList}
        onButtonUp={ButtonUpHandler}
        onButtonDown={ButtonDownHandler}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </nav>
  );
};

export default NavigationBar;
