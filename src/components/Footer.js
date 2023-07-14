import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <h1 className={classes.title}>Author</h1>
      <h2 className={classes.subtitle}>Wojciech Marciniszyn</h2>
      <ul className={classes.list}>
        <li>
          <img className={classes.img} alt="github logo" />
          <a className={classes.link} href="https://github.com/MiszynV2">
            Github
          </a>
        </li>
        <li>
          <img className={classes.img} alt="github logo" />
          <a className={classes.link} href="https://github.com/MiszynV2">
            Linkedin
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Footer;
