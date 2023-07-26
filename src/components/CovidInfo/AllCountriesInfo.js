import { useCallback, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
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
  const [data, setData] = useState([]);
  const [dates, setDates] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

  const totalPopulationOfWorldByCountryAPI = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);

    const response = await fetch("https://restcountries.com/v3.1/all");
    const response_data = await response.json();
    if (!response.ok) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setData(response_data);

    setDates(
      response_data.map((country) => {
        return country?.name.common;
      })
    );

    setLoadingStatus(LOADING_STATE.resolved);
  }, [props.iso]);

  const mappedDeaths = (data || []).map((country) => {
    return country.population;
  });

  useEffect(() => {
    totalPopulationOfWorldByCountryAPI();
  }, [totalPopulationOfWorldByCountryAPI]);

  const handleCountryClick = (event) => {
    const activeElements = event?.[0]?.chart?.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false
    );
    if (activeElements && activeElements.length > 0) {
      const selectedIndex = activeElements[0].index;
      setSelectedCountry(data[selectedIndex]);
    }
  };

  const resetSelectedCountry = () => {
    setSelectedCountry(null);
  };

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
    onClick: handleCountryClick,
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Global Statistic</h1>
      <h2 className={classes.subtitle}>{new Date().toLocaleString()}</h2>
      {selectedCountry ? (
        <div className={classes.selectedCountryInfo}>
          <h3>{selectedCountry.name.common}</h3>
          <p>Population: {selectedCountry.population}</p>
          <button onClick={resetSelectedCountry}>Back</button>
        </div>
      ) : (
        <div className={classes.chooseCountryInfo__title}>
          <p>Countries by population</p>
        </div>
      )}
      <Doughnut data={state} options={chartOptions} />
    </div>
  );
};

export default AllCountriesInfo;
