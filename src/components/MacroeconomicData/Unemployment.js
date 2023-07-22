import classes from "./Unemployment.module.css";
import { LOADING_STATE } from "../../constants";
import CovidApi from "../../services/covid-api";
import { Bar } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";

const Unemployment = (props) => {
  const [dataUrbanization, setDataUrbanization] = useState([]);
  const [dates, setDates] = useState([]);
  console.log("bezrobot.iso:", dataUrbanization);
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const UnemploymentAPI = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await CovidApi.Unemployment(props.iso);
    console.log(response, "response");
    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
      console.log(dataUrbanization, "rrrrrrrrrrrr");
    }
    setDataUrbanization(response.data[1].reverse());
    console.log(dataUrbanization, "ddddddddddd");

    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.iso]);

  useEffect(() => {
    UnemploymentAPI();
  }, [UnemploymentAPI, props]);

  useEffect(() => {
    if (dataUrbanization.length > 0) {
      setDates(
        dataUrbanization.map((date) => {
          return date?.date;
        })
      );
    }
  }, [dataUrbanization]);

  if (
    loadingStatus === LOADING_STATE.idle ||
    loadingStatus === LOADING_STATE.pending
  ) {
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
          color: "#d8b9c3",
        },
      },
    },
    elements: {
      point: {
        backgroundColor: "#d8b9c3",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Kolor linii siatki dla osi Y
        },
        ticks: {
          color: "#E8BDE", // Kolor ticków osi Y
        },
      },
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Kolor linii siatki dla osi X
        },
        ticks: {
          color: "#E8BDE", // Kolor ticków osi X
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
        data: dataUrbanization.map((date) => date?.value),
      },
    ],
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Unemployment (%)</h1>
      <div className={classes.chartDiv}>
        <Bar data={state} options={chartOptions} height={85} width={233} />
      </div>
    </div>
  );
};

export default Unemployment;
