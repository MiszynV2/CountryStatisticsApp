import classes from "./TopCountriesByArea.module.css";
import { LOADING_STATE } from "../../../constants";
import { Bar } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const TopCountriesByArea = () => {
  const [dataUrbanization, setDataUrbanization] = useState([]);
  const [dates, setDates] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const TopCountriesByAreaAPI = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await fetch("https://restcountries.com/v3.1/all");
    const response_data = await response.json();
    if (!response.ok) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setDataUrbanization(response_data);

    setLoadingStatus(LOADING_STATE.resolved);
  }, []);

  useEffect(() => {
    TopCountriesByAreaAPI();
  }, [TopCountriesByAreaAPI]);

  useEffect(() => {
    if (dataUrbanization.length > 0) {
      const sortedCountries = dataUrbanization
        .slice()
        .sort((a, b) => b.area - a.area);
      const top5Countries = sortedCountries.slice(0, 5);

      setDates(
        top5Countries.map((country) => {
          return country?.name.common;
        })
      );
    }
  }, [dataUrbanization]);

  if (
    loadingStatus === LOADING_STATE.idle ||
    loadingStatus === LOADING_STATE.pending
  ) {
    return (
      <div className={classes.countryLoader}>
        <Oval
          type="Oval"
          color="#d8b9c3"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
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
        label: "Area",
        backgroundColor: "rgb(212,160,243)",
        borderColor: "rgba(0,0,0,0.9)",
        data: dataUrbanization.map((country) => country?.area),
      },
    ],
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Top 5 countries by Area</h1>
      <div className={classes.chartDiv}>
        <Bar data={state} options={chartOptions} />
      </div>
    </div>
  );
};

export default TopCountriesByArea;
