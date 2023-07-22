import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./CovidInfoListItem.module.css";

const HealthData = (props) => {
  return (
    <>
      <div className={classes.main}>
        <li className={classes.listItem}>
          {props.label}:<span>{!props.data ? "0" : props.data}</span>
        </li>
      </div>
    </>
  );
};

export default HealthData;
