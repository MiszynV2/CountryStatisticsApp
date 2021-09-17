import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import classes from "./SearchForm.module.css";


const SearchForm = (props) => {

  const textInputRef = useRef();

  return (
    <>
      <form className={classes["input_form"]}>

          <FontAwesomeIcon className={classes.icon} icon={faSearch}/>
        <input

          onChange={(event) => props.onInputChange(event.target.value)}
          type="text"
          ref={textInputRef}
          className={classes["input"]}
          placeholder="Search for country"
        />

      </form>

    </>
  );
};
export default SearchForm;
