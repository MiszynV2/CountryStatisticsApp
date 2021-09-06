import {faAmbulance} from "@fortawesome/free-solid-svg-icons";
import classes from './Icon.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Icon=()=>{
    return(<FontAwesomeIcon className={classes.icon} icon={faAmbulance}/>)
}
export default Icon