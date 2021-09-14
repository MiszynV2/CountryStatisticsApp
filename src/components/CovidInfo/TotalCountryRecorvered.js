import classes from './TotalCountryRecorvered.module.css'
import {LOADING_STATE} from "../../constants";
import CovidApi from '../../services/covid-api'
import {Line} from "react-chartjs-2";
import {useCallback, useEffect, useState} from "react";

const TotalCountryRecorvered=(props)=>{
    const [dataDeaths, setDataDeaths] = useState([]);
    const [dates,setDates] = useState()

    const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

    const TotalDeathsCovidAPI = useCallback(async () => {

        setLoadingStatus(LOADING_STATE.pending);

        const response = await CovidApi.totalRecorveredCovidAPI(props.name)

        if (!response.isOK) {
            setLoadingStatus(LOADING_STATE.rejected);
        }

        setDataDeaths(response.data);
        setDates(response.data?.map((date)=>{
            return new Date(date?.Date).toLocaleDateString()
        }));

        setLoadingStatus(LOADING_STATE.resolved);
    }, [props.name]);


    const mappedDeaths = (dataDeaths||[]).map((date)=>{
        if(date.Province!=='')return
        return date.Cases
    })


    useEffect(() => {
        TotalDeathsCovidAPI();
    }, [TotalDeathsCovidAPI]);


    if (loadingStatus === LOADING_STATE.idle || loadingStatus.pending) {
        return <div className={classes.main}>LOADING...</div>;
    }

    if (loadingStatus === LOADING_STATE.rejected) {
        return <div className={classes.main}>Error</div>;
    }
    if (!dataDeaths) {
        return (
            <div className={classes.main}>
                <h4>Something went wrong! Try search again (:</h4>
            </div>
        );
    }
    if (dataDeaths.length===0) {
        return (
            <div className={classes.main}>
                <h4>No data</h4>
            </div>
        );
    }

    const state = {
        labels: dates,
        datasets: [
            {
                label: 'Recovered',
                fill: true,
                tooltip:false,
                borderWidth:0,
                lineTension: 0.5,
                drawBorder:false,
                drawTicks:false,
                display:false,
                backgroundColor: 'rgb(212,160,243)',
                borderColor: 'rgba(0,0,0,0.9)',
                data: mappedDeaths
            }
        ]
    }

    return(<div className={classes.main}>
            <h1 className={classes.title}>Recovered cases</h1>
            <Line className={classes.chart}  data={state}
                        />
        </div>
    )
}
export default TotalCountryRecorvered