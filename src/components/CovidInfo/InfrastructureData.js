import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./CovidInfoListItem.module.css";

const InfrastructureData = (props) => {
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

export default InfrastructureData;
