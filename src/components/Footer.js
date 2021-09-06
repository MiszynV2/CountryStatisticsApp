import classes from './Footer.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className={classes.footer}>
        <h1 className={classes.title}>Author</h1>
      <h2 className={classes.subtitle}>Wojciech Marciniszyn</h2>
        <ul className={classes.list}>
            <il><FontAwesomeIcon icon={faDotCircle}/><a className={classes.link} href="https://github.com/MiszynV2">Github</a></il>
            <li><FontAwesomeIcon icon={faDotCircle}/><a className={classes.link} href="https://github.com/MiszynV2">Linkedin</a></li>
        </ul>
    </div>
  );
};
export default Footer;
