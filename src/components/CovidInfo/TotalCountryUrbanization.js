import classes from "./TotalCountryUrbanization.module.css";
import { LOADING_STATE } from "../../constants";
import CovidApi from "../../services/covid-api";

import { Bar } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";

const TotalCountryUrbanization = (props) => {
  const [dataUrbanization, setDataUrbanization] = useState([]);
  const [dates, setDates] = useState();

  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const TotalUrbanizationCovidAPI = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await CovidApi.totalUrbanizationCovidAPI(props.iso);

    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setDataUrbanization(response.data[1].reverse());
    setDates(
      dataUrbanization.map((date) => {
        return date?.date;
      })
    );

    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.iso]);

  const mappedUrbanization = (dataUrbanization || []).map((date) => {
    return date.value;
  });

  useEffect(() => {
    TotalUrbanizationCovidAPI();
  }, [TotalUrbanizationCovidAPI]);

  if (loadingStatus === LOADING_STATE.idle || loadingStatus.pending) {
    return <div className={classes.main}>LOADING...</div>;
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div className={classes.main}>Error</div>;
  }
  if (!dataUrbanization) {
    return (
      <div className={classes.main}>
        <span className={classes.error}>
          Something went wrong! Try search again (:
        </span>
      </div>
    );
  }
  if (dataUrbanization.length === 0) {
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
        label: "Urbanization",
        fill: true,
        tooltip: false,
        borderWidth: 0,
        lineTension: 0.5,
        drawBorder: false,
        drawTicks: false,
        display: false,
        backgroundColor: "rgb(212,160,243)",
        borderColor: "rgba(0,0,0,0.9)",
        data: mappedUrbanization,
      },
    ],
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Urbanization level (%)</h1>
      <div className={classes.chartDiv}>
        <Bar data={state} options={chartOptions} height={85} width={233} />
      </div>
    </div>
  );
};
export default TotalCountryUrbanization;
