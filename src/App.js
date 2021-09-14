import "./App.css";
import {useState, useEffect, useCallback} from "react";
import NavigationBar from "./components/CountryBar/NavigationBar";
import {Content} from "./components/Content";
import Footer from "./components/Footer";
import Icon from "./components/common/Icon";
import {faAmbulance , faSun ,faMoon} from "@fortawesome/free-solid-svg-icons";
import classes from "./components/common/Icon.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchFormMobile from "./components/CountryBar/SearchFormMobile";


function App() {
    const [country, setCountry] = useState(undefined);
    const [currentTheme, setTheme] = useState('light');

    const switchTheme = () => {
        if (currentTheme==='light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            setTheme('dark')
            return
        }

            document.documentElement.setAttribute('data-theme', 'light');
            setTheme('light')

    }



    return (
        <div className={'main-wrapper'}>
        <main className={"main"}>
            <header><div><FontAwesomeIcon className={classes.icon} icon={faAmbulance}/>COVID STATS</div>
                <button className="theme-change-button" onClick={switchTheme}>
                    {currentTheme==='dark'?<FontAwesomeIcon className={classes.icon} icon={faSun}/>:<FontAwesomeIcon className={classes.icon} icon={faMoon}/>}
                </button>
            </header>
            <NavigationBar
                onClick={setCountry}
            />
            <Content country={country}/>
            <Footer className={"footer"}/>
        </main>

        </div>
    );
}

export default App;
