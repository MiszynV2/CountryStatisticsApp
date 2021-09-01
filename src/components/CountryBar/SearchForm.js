import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const textInputRef = useRef();

  return (
    <>
      <form className={classes["form__group field"]}>
        <input
          onChange={(event) => props.onInputChange(event.target.value)}
          type="text"
          ref={textInputRef}
          className={classes["form__field"]}
          placeholder="Name"
        ></input>
      </form>
      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </>
  );
};
export default SearchForm;
