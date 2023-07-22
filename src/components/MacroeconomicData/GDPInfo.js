import classes from "./GDPInfo.module.css";
import CovidApi from "../../services/covid-api";
import { useCallback, useEffect, useState } from "react";
import { LOADING_STATE } from "../../constants";
import { Bar } from "react-chartjs-2";

const GDPInfo = (props) => {
  const [dataPKB, setDataPKB] = useState([]);
  const [dates, setDates] = useState();

  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);
  const GDPInfo = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await CovidApi.GDP(props.iso);

    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setDataPKB(response.data[1].reverse());
    setDates(
      dataPKB.map((date) => {
        return date?.date;
      })
    );

    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.iso]);

  const mappedPKB = (dataPKB || []).map((date) => {
    return date?.value;
  });

  useEffect(() => {
    GDPInfo();
  }, [GDPInfo, props]);

  if (loadingStatus === LOADING_STATE.idle || loadingStatus.pending) {
    return <div className={classes.main}>LOADING...</div>;
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div className={classes.main}>Error</div>;
  }

  if (!dataPKB) {
    return (
      <div className={classes.main}>
        <span className={classes.error}>
          Something went wrong! Try search again (:
        </span>{" "}
      </div>
    );
  }
  if (dataPKB.length === 0) {
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
          color: "#000000",
        },
      },
    },
    elements: {
      point: {
        backgroundColor: "#000000",
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
        label: "Country PKB",
        fill: true,
        tooltip: false,
        borderWidth: 0,
        lineTension: 0.5,
        backgroundColor: "rgba(77, 93, 240,0.9)",
        borderColor: "rgba(0,0,0,0.9)",
        data: mappedPKB,
        drawBorder: false,
        drawTicks: false,
        display: false,
        data: dataPKB.map((date) => date?.value),
      },
    ],
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Gross Domestic Product (GDP)</h1>
      <div className={classes.chartDiv}>
        <Bar data={state} options={chartOptions} height={85} width={233} />
      </div>
    </div>
  );
};
export default GDPInfo;
