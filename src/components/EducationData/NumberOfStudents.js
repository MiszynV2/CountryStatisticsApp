import classes from "./NumberOfStudents.module.css";
import CovidApi from "../../services/covid-api";
import { useCallback, useEffect, useState } from "react";
import { LOADING_STATE } from "../../constants";
import { Bar } from "react-chartjs-2";

const NumberOfStudents = (props) => {
  const [dataNumberOfStudents, setDataNumberOfStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const fetchNumberOfStudentsData = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await CovidApi.NumberOfStudents(props.iso);

    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    } 
      setDataNumberOfStudents(response.data[1].reverse());
    }

    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.iso]);

  useEffect(() => {
    fetchNumberOfStudentsData();
  }, [fetchNumberOfStudentsData,props]);

  useEffect(() => {
    if (dataNumberOfStudents.length > 0) {
      setDates(
        dataNumberOfStudents.map((date) => {
          return date?.date;
        })
      );
    }
  }, [dataNumberOfStudents]);

  if (
    loadingStatus === LOADING_STATE.idle ||
    loadingStatus === LOADING_STATE.pending
  ) {
    return <div className={classes.main}>LOADING...</div>;
  }

  if (loadingStatus === LOADING_STATE.rejected) {
    return <div className={classes.main}>Error</div>;
  }

  if (!dataNumberOfStudents) {
    return (
      <div className={classes.main}>
        <span className={classes.error}>
          Something went wrong! Try search again (:
        </span>{" "}
      </div>
    );
  }

  if (dataNumberOfStudents.length === 0) {
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
        label: "School enrollment, secondary (% gross)",
        fill: true,
        tooltip: false,
        borderWidth: 0,
        lineTension: 0.5,
        backgroundColor: "rgba(77, 93, 240,0.9)",
        borderColor: "rgba(0,0,0,0.9)",
        data: dataNumberOfStudents.map((date) => date?.value),
      },
    ],
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>School enrollment, secondary (% gross)</h1>
      <div className={classes.chartDiv}>
        <Bar data={state} options={chartOptions} height={85} width={233} />
      </div>
    </div>
  );
};

export default NumberOfStudents;
