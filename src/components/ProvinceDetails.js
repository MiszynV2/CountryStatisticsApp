import classes from "./ProvinceDetails.module.css";
import ProvinceView from "./common/Title";
import CovidInfoListItem from "./CovidInfo/CovidInfoListItem";
import {faCheckCircle, faHospital, faLaugh, faSkull} from "@fortawesome/free-solid-svg-icons";

const config = [
    {
        component: ProvinceView,
        getProps: (province,country) => ({
            name: province.province
        })
    },
    {
        component: CovidInfoListItem,
        getProps: (province) => ({
            data: province.recovered,
            icon: faHospital,
            label: "Active",
        })
    },
    {
        component: CovidInfoListItem,
        getProps: (province) => ({
            data: province.confirmed,
            icon: faCheckCircle,
            label: "Confirmed"
        })
    },
    {
        component: CovidInfoListItem,
        getProps: (province) => ({
            data: province.deaths,
            icon: faSkull,
            label: "Deaths"
        })

    },
    {
        component: CovidInfoListItem,
        getProps: (province) => ({
            data: province.recovered,
            icon: faLaugh,
            label: "Recovered"
        })
    }
]

const ProvinceDetails = ({ provinces}) => {
    return (
        <div className={classes.listWrapper}>
        <ul className={classes.list}>
            {provinces.map(province => {
                if (!province) return (
                    <div className={classes.noData}>
                        <h4>No data found</h4>
                    </div>
                );
                return (
                    <>
                        <>
                            {config.map((c,id )=> {
                                const Component = c.component
                                return (<Component {...c.getProps(province)}/>)
                            })}
                        </>
                    </>
                );
            })}
        </ul>
        </div>
    );

};
export default ProvinceDetails;
