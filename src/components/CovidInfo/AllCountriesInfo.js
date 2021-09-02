import { useCallback, useEffect, useState } from "react";
import CovidInfoListItem from "./CovidInfoListItem";
import {
  faCheckCircle,
  faAmbulance,
  faCalendarDay,
  faSkull,
  faLaugh,
} from "@fortawesome/free-solid-svg-icons";
import CovidApi from "../../services/covid-api"
import {LOADING_STATE} from "../../constants";
import classes from './AllCountriesInfo.module.css'

const AllCountriesInfo = (props) => {
  // TODO: Create a custom hook
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const fetchCovidData = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);
    const response = await CovidApi.total()

    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setData(response.data);
    setLoadingStatus(LOADING_STATE.resolved);
  }, []);

  useEffect(() => {
    fetchCovidData();
  }, [fetchCovidData]);
  // TODO: end Create a custom hook

  if (loadingStatus === LOADING_STATE.idle || loadingStatus.pending) {
    return <div>LOADING...</div>;
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div>Error</div>;
  }

  if (!data.length) {
    return <h4>No data found</h4>;
  }
  
  const totalData = data[0]

  return (
    <div className={classes.main}>
      <ul className={classes.listItem}>
        <CovidInfoListItem
          icon={faCheckCircle}
          label="Confirmed"
          data={totalData.confirmed}
        />

        <CovidInfoListItem
          icon={faAmbulance}
          label="Critical"
          data={totalData.critical}
        />

        <CovidInfoListItem
          icon={faCalendarDay}
          label="Date"
          data={totalData.date}
        />
        <CovidInfoListItem
          icon={faSkull}
          label="Deaths"
          data={totalData.deaths}
        />
        <CovidInfoListItem
          icon={faLaugh}
          label="Recovered"
          data={totalData.recovered}
        />
      </ul>
    </div>
  );
};
export default AllCountriesInfo;
