import classes from "./Footer.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <div className={classes.footer}>
      <h1 className={classes.title}>Author</h1>
      <h2 className={classes.subtitle}>Wojciech Marciniszyn</h2>
      <ul className={classes.list}>
        <li>
          <a className={classes.link} href="https://github.com/MiszynV2">
            <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            Github
          </a>
        </li>
        <li>
          <a className={classes.link} href="https://github.com/MiszynV2">
            <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            Linkedin
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Footer;
