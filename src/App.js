import "./App.css";
import React, { useState } from "react";
import NavigationBar from "./components/CountryBar/NavigationBar";
import { Content } from "./components/Content";
import Footer from "./components/Footer";
import classes from "./components/common/Icon.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import SearchFormMobile from "./components/CountryBar/SearchFormMobile";
import useWindowSize from "./services/useWindowSize";

function App() {
  const size = useWindowSize();
  const [country, setCountry] = useState(undefined);
  const [currentTheme, setTheme] = useState("light");
  console.log(country);
  const switchTheme = () => {
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
      return;
    }

    document.documentElement.setAttribute("data-theme", "light");
    setTheme("light");
  };

  return (
    <div className={"main-wrapper"}>
      <main className={"main"}>
        <header>
          <div className={"wrapperTitle"}>
            <FontAwesomeIcon className={classes.icon} icon={faMap} />
            COUNTRY STATS
          </div>
          <button className="theme-change-button" onClick={switchTheme}>
            {currentTheme === "dark" ? (
              <FontAwesomeIcon className={classes.icon} icon={faSun} />
            ) : (
              <FontAwesomeIcon className={classes.icon} icon={faMoon} />
            )}
          </button>
        </header>
        {size.width > 700 ? (
          <NavigationBar onClick={setCountry} />
        ) : (
          <SearchFormMobile onInputSelected={setCountry} />
        )}
        <Content country={country} />
        <Footer className={"footer"} />
      </main>
    </div>
  );
}

export default App;
