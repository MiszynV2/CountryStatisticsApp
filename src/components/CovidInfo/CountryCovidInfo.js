import {useCallback, useState, useEffect} from "react";
import classes from "./CountryCovidInfo.module.css";
import ProvinceDetails from "../ProvinceDetails"
import CovidApi from '../../services/covid-api'

const LOADING_STATE = {
    idle: "idle",
    pending: "pending",
    resolved: "resolved",
    rejected: "rejected",
};

const CountryCovidInfo = (props) => {
    const [data, setData] = useState();
    const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);
    const FetchingCovidHandler = useCallback(async () => {
        setLoadingStatus(LOADING_STATE.pending);
        try {
            const {data,isOK}= await CovidApi.byCountry(props.code)


            console.log(data)
            if (!isOK) {
                setLoadingStatus(LOADING_STATE.rejected);
            }

            setData(data)
            setLoadingStatus(LOADING_STATE.resolved);
        } catch (e) {
            console.log("error", e);

        }
    }, [props.code]);

    useEffect(() => {
        FetchingCovidHandler();
    }, [FetchingCovidHandler]);
    console.log(data)

    if (
        loadingStatus === LOADING_STATE.idle ||
        loadingStatus === loadingStatus.pending
    ) {
        return <div>LOADING...</div>;
    }

    if (loadingStatus === LOADING_STATE.rejected) {
        return <div>Error</div>;
    }

    if (!data || !data.length) {
        return (
            <div className={classes.noData}>
                <h4>Something went wrong! Try search again (:</h4>
            </div>
        );
    }

    return (
        <ProvinceDetails country={data[0].country} provinces={data[0].provinces}/>
    )
}

export default CountryCovidInfo;
