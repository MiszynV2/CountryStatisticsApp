import classes from './TotalCountryDeaths.module.css'
import CovidApi, {totalDeathsCovidAPI} from '../../services/covid-api'
import {useCallback, useEffect, useState} from "react";
import {LOADING_STATE} from "../../constants";
import {Line} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";


const TotalCountryDeaths=(props)=>{
    const [dataDeaths, setDataDeaths] = useState([]);
    const [dates,setDates] = useState()

    const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

    const TotalDeathsCovidAPI = useCallback(async () => {

        setLoadingStatus(LOADING_STATE.pending);

        const response = await CovidApi.totalDeathsCovidAPI(props.name)

        if (!response.isOK) {
            setLoadingStatus(LOADING_STATE.rejected);
        }

        setDataDeaths(response.data);
        setDates(response.data?.map((date)=>{
            return new Date(date?.Date).toLocaleDateString()
        }));

        setLoadingStatus(LOADING_STATE.resolved);
    }, [props.name]);


    const mappedDeaths = (dataDeaths || []).map((date)=>{
        if(date.Province!=='')return
        return date?.Cases
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
                label: 'Deaths',
                fill: true,
                tooltip:false,
                borderWidth:0,
                lineTension: 0.5,
                backgroundColor: 'rgba(77, 93, 240,0.9)',
                borderColor: 'rgba(0,0,0,0.9)',
                data: mappedDeaths,
                drawBorder:false,
                drawTicks:false,
                display:false,

            }
        ]
    }

    return(<div className={classes.main}>
            <h1 className={classes.title}>Deaths cases</h1>
            <Bar className={classes.chart} data={state}/>
        </div>
    )
}
export default TotalCountryDeaths