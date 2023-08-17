import { useCallback, useState, useEffect } from "react";
import classes from "./CountryInformation.module.css";
import CovidApi from "../../services/covid-api";

const LOADING_STATE = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  rejected: "rejected",
};

const CountryInformation = (props) => {
  const [data, setData] = useState();
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);
  const FetchingCovidHandler = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);
    try {
      const { data, isOK } = await CovidApi.CountryInfos(props.iso);

      if (!isOK) {
        setLoadingStatus(LOADING_STATE.rejected);
      }

      setData(data);

      setLoadingStatus(LOADING_STATE.resolved);
    } catch (e) {}
  }, [props.iso]);

  useEffect(() => {
    FetchingCovidHandler();
  }, [FetchingCovidHandler]);

  if (
    loadingStatus === LOADING_STATE.idle ||
    loadingStatus === loadingStatus.pending
  ) {
    return <div>LOADING...</div>;
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div>Error</div>;
  }

  if (!data) {
    return (
      <div className={classes.main}>
        <h4>Something went wrong! Try search again (:</h4>
      </div>
    );
  }
  return (
    <div className={classes.main}>
      <div className={classes.mainInfo}>
        <div className={classes.flagTitle}>
          <img className={classes.flag} alt={""} src={data[0].flags.svg} />
          <span className={classes.title}>{data[0].name.common}</span>
        </div>
        <span className={classes.subtitle}>Country data</span>
      </div>
      <ul className={classes.list}>
        <li className={classes.info}>
          <span className={classes.firstInfo}>Region</span>
          <span className={classes.regionInfo}>{data[0].region}</span>
        </li>
        <li className={classes.info}>
          <span className={classes.firstInfo}>Capital</span>
          <span className={classes.capitalInfo}>{data[0].capital}</span>
        </li>
        <li className={classes.info}>
          <span className={classes.firstInfo}>Status</span>
          <span className={classes.languagesInfo}>assigned</span>
        </li>
        <li className={classes.info}>
          <span className={classes.firstInfo}>Population</span>
          <span className={classes.populationInfo}>
            {data[0].population.toLocaleString()}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default CountryInformation;
