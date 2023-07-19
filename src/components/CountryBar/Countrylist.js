import CountryItem from "./CountryItem";
import classes from "./CountryList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../services/useWindowSize";

const CountryList = ({
  onClick,
  countries,
  onButtonUp,
  onButtonDown,
  searchPhrase,
  currentPage,
  totalPages,
}) => {
  const size = useWindowSize();
  const pageWidth = size.width;
  const pageHeight = size.height;
  let pageSize = Math.floor(pageHeight / 120);
  if (pageWidth > 1200) {
    pageSize = 8;
  } else {
    pageSize = 16;
  }
  const paginatedListOfCountry = countries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  return (
    <div className={classes.listWrapper}>
      <button
        onClick={onButtonUp}
        className={
          currentPage !== 1 ? classes.upButton : classes.upButtonDisable
        }
      >
        {" "}
        {currentPage !== 1 ? (
          <FontAwesomeIcon icon={faArrowUp} className={classes.icon} />
        ) : (
          ""
        )}
      </button>
      <ul className={classes.list}>
        {paginatedListOfCountry.map((country) => (
          <CountryItem
            flagsvg={country.flagsvg}
            onCountryClick={onClick}
            key={country.iso}
            country={country}
            searchPhrase={searchPhrase}
          />
        ))}
      </ul>
      <button
        onClick={onButtonDown}
        className={
          currentPage !== totalPages
            ? classes.downButton
            : classes.downButtonDisable
        }
      >
        {" "}
        {currentPage !== totalPages ? (
          <FontAwesomeIcon icon={faArrowDown} className={classes.icon} />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};
export default CountryList;
