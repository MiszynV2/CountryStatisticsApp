import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./CovidInfoListItem.module.css";
const CovidInfoListItem = (props) => {
  return (
    <li className={classes.listItem}>
      <FontAwesomeIcon className={classes.icons} icon={props.icon} />
      {props.label}:<span>{props.data}</span>
    </li>
  );
};

export default CovidInfoListItem;
