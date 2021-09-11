import { useCallback, useEffect, useState } from "react";
import {Line} from "react-chartjs-2";
import CovidApi from "../../services/covid-api"
import {LOADING_STATE} from "../../constants";
import classes from './AllCountriesInfo.module.css'

const AllCountriesInfo = (props) => {
  // TODO: Create a custom hook
  const [data, setData] = useState([]);
  const [dates,setDates] = useState()
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);
  const fetchCovidData = useCallback(async () => {
    setLoadingStatus(LOADING_STATE.pending);
    const response = await CovidApi.total()

    if (!response.isOK) {
      setLoadingStatus(LOADING_STATE.rejected);
    }

    setData(response.data);
    setDates(response.data?.map((date)=>{
      return (date?.reportDate)
    }));

    setLoadingStatus(LOADING_STATE.resolved);
  }, []);

  const mappedDeaths = (data||[]).map((date)=>{
    return date.totalConfirmed
  })

  useEffect(() => {
    fetchCovidData();
  }, [fetchCovidData]);
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

  const state = {
    labels: dates,
    datasets: [
      {
        label: 'Totals',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(77, 93, 240,0.9)',
        borderColor: 'rgba(0,0,0,0.9)',
        borderWidth: 1,
        data: mappedDeaths,
        drawBorder:false,
        drawTicks:false,
        display:false,

      }
    ]
  }

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Global Statistic</h1>
      <h2 className={classes.subtitle }>{new Date().toLocaleString()}</h2>
      <Line width="400" height="400" data={state}/>
    </div>
  );
};
export default AllCountriesInfo;
