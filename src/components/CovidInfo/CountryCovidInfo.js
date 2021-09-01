import { useCallback, useState, useEffect } from "react";

import {
  faCheckCircle,
  faHospital,
  faLaugh,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./CountryCovidInfo.module.css";
import CovidInfoListItem from "./CovidInfoListItem";

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
      const response = await fetch(
        `https://covid-19-data.p.rapidapi.com/report/country/code?code=${props.code}&date=2020-04-01`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key":
              "4ea47fdc47mshd5f1a2bb4ffc58cp1d8648jsncdd3c5e8bf93",
          },
        }
      );
      const data = await response.json();
      setLoadingStatus(LOADING_STATE.resolved);
      setData(data);
    } catch (e) {
      console.log("error", e);
      setLoadingStatus(LOADING_STATE.rejected);
    }
  }, [props.code]);

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

  if (!data || !data.length) {
    return (
      <div className={classes.noData}>
        <h4>Something went wrong! Try search again (:</h4>
      </div>
    );
  }
  if (
    !data[0].provinces[0].active &&
    !data[0].provinces[0].confirmed &&
    !data[0].provinces[0].deaths &&
    !data[0].provinces[0].recovered
  ) {
    return (
      <div className={classes.noData}>
        <h4>No data found</h4>
      </div>
    );
  }
  return (
    <>
      <div className={classes.noData}>
        <h4>{props.name}</h4>
      </div>

      <ul className={classes.list}>
        <CovidInfoListItem
          icon={faHospital}
          label="Active"
          data={data[0].provinces[0].active}
        />

        <CovidInfoListItem
          icon={faCheckCircle}
          label="Confirmed"
          data={data[0].provinces[0].confirmed}
        />

        <CovidInfoListItem
          icon={faSkull}
          label="Deaths"
          data={data[0].provinces[0].deaths}
        />

        <CovidInfoListItem
          icon={faLaugh}
          label="Active"
          data={data[0].provinces[0].recovered}
        />
      </ul>
    </>
  );
};

export default CountryCovidInfo;
