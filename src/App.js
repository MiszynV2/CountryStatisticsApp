import "./App.css";
import {useState, useEffect, useCallback} from "react";
import NavigationBar from "./components/CountryBar/NavigationBar";
import {Content} from "./components/Content";
import Footer from "./components/Footer";
import Icon from "./components/common/Icon";


function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(undefined);

    const fetchCountries = useCallback(async () => {
        try {
            const response = await fetch("https://restcountries.eu/rest/v2/all");
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            const loadedCountries = data.map((country, id) => ({
                ...country,
                id,
                code: country.alpha2Code,
            }));

            setCountries(loadedCountries);
        } catch (error) {
            // TODO: handle errors properly
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    return (
        <div className={'main-wrapper'}>
        <main className={"main"}>
            <header><Icon/>COVID STATS</header>
            <NavigationBar
                list={countries}
                onClick={setCountry}
            />
            <Content country={country}/>
            <Footer className={"footer"}/>
        </main>
        </div>
    );
}

export default App;
