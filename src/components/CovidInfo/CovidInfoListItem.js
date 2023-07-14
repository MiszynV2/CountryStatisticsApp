import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classes from "./CovidInfoListItem.module.css";

const CovidInfoListItem = (props) => {
    return (
        <>

        <div className={classes.main}>
            <li className={classes.listItem}>
                <FontAwesomeIcon className={classes.icons} icon={props.icon}/>
                {props.label}:<span>{!props.data?'0':props.data}</span>
            </li>
        </div>
            </>
    );
};

export default CovidInfoListItem;
