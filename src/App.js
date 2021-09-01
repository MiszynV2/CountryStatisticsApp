import "./App.css";
import { useState, useEffect, useCallback } from "react";
import GeneralInfo from "./components/CovidInfo/GeneralInfo";
import Footer from "./components/Footer";
import NavigationBar from "./components/CountryBar/NavigationBar";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({ code: "", name: "" });

  const handleCountryCLick = (code, name) => {
    setCountryInfo({
      code,
      name,
    });
  };

  const fetchCountriesHandler = useCallback(async () => {
    try {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedCountries = data.map((country, id) => ({
        id,
        name: country.name,
        code: country.alpha2Code.toLowerCase(),
        flag: country.flag,
      }));

      setCountries(loadedCountries);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchCountriesHandler();
  }, [fetchCountriesHandler]);

  return (
    <div className={"main"}>
      <section className="main__countries-list">
        <NavigationBar
          countries={countries}
          onCountryClick={handleCountryCLick}
        />
      </section>
      <section className="main_general-info">
        <GeneralInfo data={countryInfo} />
      </section>
      <Footer className={"footer"} />
    </div>
  );
}

export default App;
