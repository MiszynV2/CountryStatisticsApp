import classes from "./PublicDebt.module.css";
import CovidApi from "../../services/covid-api";
import { useCallback, useEffect, useState } from "react";
import { LOADING_STATE } from "../../constants";
import { Bar } from "react-chartjs-2";
import { Oval } from "react-loader-spinner";

const PublicDebt = (props) => {
  const [dataPopulation, setDataPopulation] = useState([]);
  const [dates, setDates] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const fetchPublicDebtData = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await CovidApi.PublicDebt(props.iso);

    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    }
    setDataPopulation(response.data[1].reverse());

    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.iso]);

  useEffect(() => {
    fetchPublicDebtData();
  }, [fetchPublicDebtData, props]);

  useEffect(() => {
    if (dataPopulation.length > 0) {
      setDates(
        dataPopulation.map((date) => {
          return date?.date;
        })
      );
    }
  }, [dataPopulation]);

  if (
    loadingStatus === LOADING_STATE.idle ||
    loadingStatus === LOADING_STATE.pending
  ) {
    return (
      <div className={classes.main}>
        <Oval
          type="Oval"
          color="#d8b9c3"
          height={50}
          width={50}
          timeout={3000} // Opcjonalnie, timeout w milisekundach, po którym animacja przestanie się wyświetlać
        />
      </div>
    );
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div className={classes.main}>Error</div>;
  }

  if (!dataPopulation) {
    return (
      <div className={classes.main}>
        <span className={classes.error}>
          Something went wrong! Try search again (:
        </span>{" "}
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
        ticks: {
          color: "#E8BDE", // Kolor ticków osi Y
        },
      },
      x: {
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
        label: "Public Debt ($)",
        fill: true,
        tooltip: false,
        borderWidth: 0,
        lineTension: 0.5,
        drawBorder: false,
        drawTicks: false,
        display: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,0.3)",
        data: dataPopulation.map((date) => date?.value),
      },
    ],
    legend: {
      display: false,
    },
    scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Public debt ($)</h1>
      <div className={classes.chartDiv}>
        <Bar data={state} options={chartOptions} height={85} width={233} />
      </div>
    </div>
  );
};

export default PublicDebt;
