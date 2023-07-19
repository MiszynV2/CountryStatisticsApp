import classes from "./TotalCountryPopulation.module.css";
import CovidApi from "../../services/covid-api";
import { useCallback, useEffect, useState } from "react";
import { LOADING_STATE } from "../../constants";
import { Bar } from "react-chartjs-2";

const TotalCountryPopulation = (props) => {
  const [dataPopulation, setDataPopulation] = useState([]);
  const [dates, setDates] = useState();

  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const TotalPopulationCovidAPI = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

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
  }, [props.iso]);

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
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#000000", // Kolor tekstu legendy
        },
      },
    },
    elements: {
      point: {
        backgroundColor: "#000000", // Kolor punktów na wykresie
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: "#E8BDE",
        },
      },
      x: {
        ticks: {
          color: "#E8BDE",
        },
      },
    },
  };

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
        <Bar data={state} options={chartOptions} height={85} width={233} />
      </div>
    </div>
  );
};
export default TotalCountryPopulation;
