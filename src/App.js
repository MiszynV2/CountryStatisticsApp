import "./App.css";
import {useState, useEffect, useCallback} from "react";
import NavigationBar from "./components/CountryBar/NavigationBar";
import {Content} from "./components/Content";
import Footer from "./components/Footer";
import Icon from "./components/common/Icon";
import {faAmbulance , faSun} from "@fortawesome/free-solid-svg-icons";
import classes from "./components/common/Icon.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function App() {
    const [country, setCountry] = useState(undefined);
    const [currentTheme, setTheme] = useState('light');

    const switchTheme = () => {
        if (currentTheme==='light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            setTheme('dark')
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
            setTheme('light')
        }
    }



    return (
        <div className={'main-wrapper'}>
        <main className={"main"}>
            <header><FontAwesomeIcon className={classes.icon} icon={faAmbulance}/>COVID STATS
                <button onClick={switchTheme}>
                <FontAwesomeIcon className={classes.icon} icon={faSun}/>
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
