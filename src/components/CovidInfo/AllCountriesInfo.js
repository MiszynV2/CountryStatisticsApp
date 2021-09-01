import { useCallback, useEffect, useState } from "react";
import CovidInfoListItem from "./CovidInfoListItem";
import {
  faCheckCircle,
  faAmbulance,
  faCalendarDay,
  faSkull,
  faLaugh,
} from "@fortawesome/free-solid-svg-icons";

const LOADING_STATE = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  rejected: "rejected",
};

const AllCountriesInfo = (props) => {
  const [data, setData] = useState();
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);
  const FetchingCovidHandler = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);
    const response = await fetch(
      "https://covid-19-data.p.rapidapi.com/report/totals?date=2020-07-21",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key":
            "4ea47fdc47mshd5f1a2bb4ffc58cp1d8648jsncdd3c5e8bf93",
        },
      }
    );
    if (!response.ok) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    const data = await response.json();

    setData(data);
    setLoadingStatus(LOADING_STATE.resolved);
  }, []);

  useEffect(() => {
    FetchingCovidHandler();
  }, [FetchingCovidHandler]);

  if (loadingStatus === LOADING_STATE.idle || loadingStatus.pending) {
    return <div>LOADING...</div>;
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div>Error</div>;
  }

  if (!data || !data.length) {
    return <h4>No data found</h4>;
  }
  return (
    <div>
      <ul>
        <CovidInfoListItem
          icon={faCheckCircle}
          label="Confirmed"
          data={data[0].confirmed}
        />

        <CovidInfoListItem
          icon={faAmbulance}
          label="Critical"
          data={data[0].critical}
        />

        <CovidInfoListItem
          icon={faCalendarDay}
          label="Date"
          data={data[0].date}
        />
        <CovidInfoListItem
          icon={faSkull}
          label="Deaths"
          data={data[0].deaths}
        />
        <CovidInfoListItem
          icon={faLaugh}
          label="Recovered"
          data={data[0].recovered}
        />
      </ul>
    </div>
  );
};
export default AllCountriesInfo;
