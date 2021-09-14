import CountryItem from "./CountryItem";
import classes from "./CountryList.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp,faArrowDown} from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../services/useWindowSize";

const CountryList = ({
                         onClick,
                         countries,
                         onButtonUp,
                         onButtonDown,
                         searchPhrase,
                         currentPage,
                         totalPages
                     }) => {
    const size = useWindowSize()
    const pageSize = Math.floor(size.height/121);
    console.log('pageSize',pageSize)
    const paginatedListOfCountry = countries.slice((currentPage-1)*pageSize,currentPage*pageSize);
    return (<>
            <button onClick={onButtonUp}  className={currentPage!==1 ? classes.upButton : classes.upButtonDisable}> {currentPage!==1 ?<FontAwesomeIcon icon={faArrowUp} className={classes.icon}/>:''}</button>
            <ul className={classes.list}>
                {paginatedListOfCountry.map((country) => (
                        <CountryItem
                            onCountryClick={onClick}
                            key={country.iso}
                            country={country}
                            searchPhrase={searchPhrase}
                        />
                ))}
            </ul>
            <button onClick={onButtonDown} className={currentPage!==totalPages ? classes.downButton:classes.downButtonDisable}> {currentPage!==totalPages ?<FontAwesomeIcon icon={faArrowDown} className={classes.icon}/>:''}</button>
        </>
    );
};
export default CountryList;
