import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const textInputRef = useRef();

  return (
    <>
      <form className={classes["retro-input_form"]}>
        <input
          onChange={(event) => props.onInputChange(event.target.value)}
          type="text"
          ref={textInputRef}
          className={classes["retro-input"]}
          placeholder="Poland"
        />
      </form>
    </>
  );
};
export default SearchForm;
