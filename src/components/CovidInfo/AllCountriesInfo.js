import { useCallback, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import CovidApi from "../../services/covid-api";
import { LOADING_STATE } from "../../constants";
import classes from "./AllCountriesInfo.module.css";

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(
      0,
      255
    )}, ${getRandomValue(0, 255)}, 0.6)`;
    colors.push(color);
  }
  return colors;
};

const AllCountriesInfo = (props) => {
  // TODO: Create a custom hook
  const [data, setData] = useState([]);
  const [dates, setDates] = useState();

  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const totalPopulationOfWorldByCountryAPI = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await fetch("https://restcountries.com/v3.1/all");
    const response_data = await response.json();
    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setData(response_data);

    setDates(
      data.map((date) => {
        return date?.name.common;
      })
    );
    console.log(data, " response AllCountriesInfodata", dates);
    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.iso]);

  const mappedDeaths = (data || []).map((date) => {
    return date.population;
  });

  useEffect(() => {
    totalPopulationOfWorldByCountryAPI();
  }, [totalPopulationOfWorldByCountryAPI]);
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
  console.log(mappedDeaths, "mappedDeaths  ąąąą  dates ", dates);

  const state = {
    labels: dates,
    datasets: [
      {
        label: "Totals",
        fill: true,
        tooltip: false,
        borderWidth: 0,
        lineTension: 0.5,
        drawBorder: false,
        drawTicks: false,
        display: false,
        backgroundColor: generateRandomColors(mappedDeaths.length),
        borderColor: "rgba(0,0,0,0.9)",
        data: mappedDeaths,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, index) => {
                const dataset = data.datasets[0];
                const backgroundColor = dataset.backgroundColor[index];
                const borderColor = dataset.borderColor[index];

                return {
                  fillStyle: backgroundColor,
                  strokeStyle: borderColor,
                  lineWidth: dataset.borderWidth,
                  hidden:
                    isNaN(dataset.data[index]) ||
                    chart.getDatasetMeta(0).data[index].hidden,
                  index: index,
                };
              });
            }
            return [];
          },
        },
      },
    },
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Global Statistic</h1>
      <h2 className={classes.subtitle}>{new Date().toLocaleString()}</h2>
      <Doughnut data={state} options={chartOptions} />
    </div>
  );
};
export default AllCountriesInfo;
