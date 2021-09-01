import classes from "./CountryItem.module.css";

const CountryItem = (props) => {
  return (
    <li
      code={props.code}
      onClick={() => {
        props.onCountryClick(props.code, props.name);
      }}
      className={classes.country}
      role="button"
      title={props.name}
    >
      <img alt={props.flag} className={classes.flag} src={props.flag} />

      {props.name}
    </li>
  );
};
export default CountryItem;
