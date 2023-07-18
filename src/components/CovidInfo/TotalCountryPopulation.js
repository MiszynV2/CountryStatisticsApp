import classes from "./TotalCountryPopulation.module.css";
import CovidApi, {
  totalPopulationCovidAPI,
  totalUrbanizationCovidAPI,
  totalRecorveredCovidAPI,
} from "../../services/covid-api";
import { useCallback, useEffect, useState } from "react";
import { LOADING_STATE } from "../../constants";
import { Bar } from "react-chartjs-2";
import useWindowSize from "../../services/useWindowSize";

const TotalCountryPopulation = (props) => {
  const [dataPopulation, setDataPopulation] = useState([]);
  const [dates, setDates] = useState();
  const size = useWindowSize();
  const sizeWidth = size.width;

  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const TotalPopulationCovidAPI = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);
    console.log("TotalCountryStatistics props", props);
    const response = await CovidApi.totalPopulationCovidAPI(props.iso);

    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setDataPopulation(response.data[1].reverse());

    setDates(
      dataPopulation.map((date) => {
        return date?.date;
      })
    );

    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.name]);

  // setFilteredDates((dataPopulation||[]).filter(date=>
  //     date.Province===''
  // ))
  //if(dataPopulation===undefined)return
  const mappedPopulation = (dataPopulation || []).map((date) => {
    return date?.value;
  });

  useEffect(() => {
    TotalPopulationCovidAPI();
  }, [TotalPopulationCovidAPI]);

  if (loadingStatus === LOADING_STATE.idle || loadingStatus.pending) {
    return <div className={classes.main}>LOADING...</div>;
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div className={classes.main}>Error</div>;
  }
  if (!dataPopulation) {
    return (
      <div className={classes.main}>
        <span className={classes.error}>
          Something went wrong! Try search again (:
        </span>
      </div>
    );
  }

  if (dataPopulation.length === 0) {
    return (
      <div className={classes.main}>
        <h4>No data</h4>
      </div>
    );
  }

  const state = {
    labels: dates,
    datasets: [
      {
        label: "Population",
        fill: true,
        tooltip: false,
        borderWidth: 0,
        lineTension: 0.5,
        drawBorder: false,
        drawTicks: false,
        display: false,
        scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,0.3)",
        data: mappedPopulation,
      },
    ],
    legend: {
      display: false,
    },
    scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Total Population</h1>
      <div className={classes.chartDiv}>
        <Bar
          data={state}
          options={{ maintainAspectRatio: false }}
          height={85}
          width={233}
        />
      </div>
    </div>
  );
};
export default TotalCountryPopulation;
