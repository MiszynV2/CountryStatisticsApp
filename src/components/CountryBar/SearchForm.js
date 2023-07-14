import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  console.log(props, "props");
  const textInputRef = useRef();

  const handleInputChange = (event) => {
    event.persist(); // Remove synthetic event from the pool
    const value = event.target.value;
    console.log(value, "value");
    props.onInputChange(value);
  };

  return (
    <>
      <form className={classes["input_form"]}>
        <FontAwesomeIcon className={classes.icon} icon={faSearch} />
        <input
          onChange={handleInputChange}
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
