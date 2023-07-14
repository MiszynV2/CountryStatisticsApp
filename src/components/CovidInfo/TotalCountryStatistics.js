import classes from './TotalCountryStatistics.module.css'
import CovidApi, {totalCasesCovidAPI,totalDeathsCovidAPI,totalRecorveredCovidAPI} from '../../services/covid-api'
import {useCallback, useEffect, useState} from "react";
import {LOADING_STATE} from "../../constants";
import {Bar, Bubble, Doughnut, Line} from "react-chartjs-2";
import useWindowSize from "../../services/useWindowSize";
import {Pie} from "react-chartjs-2";



const TotalCountryStatistics=(props)=>{
    const [dataCases, setDataCases] = useState([]);
    const [dates,setDates] = useState()
    const size = useWindowSize()
    const sizeWidth = size.width

    const [loadingStatus, setLoadingStatus] = useState(LOADING_STATE.idle);

    const TotalCasesCovidAPI = useCallback(async () => {

        setLoadingStatus(LOADING_STATE.pending);

        const response = await CovidApi.totalCasesCovidAPI(props.name)

        if (!response.isOK) {
            setLoadingStatus(LOADING_STATE.rejected);
        }

        setDataCases(response.data);
        setDates(response.data?.map((date)=>{
            return new Date(date?.Date).toLocaleDateString()
        }));

        setLoadingStatus(LOADING_STATE.resolved);
    }, [props.name]);

    // setFilteredDates((dataCases||[]).filter(date=>
    //     date.Province===''
    // ))
    //if(dataCases===undefined)return
    const mappedCases = (dataCases||[]).map((date)=>{
        if(date.Province!=='')return
        return date?.Cases
    })

    useEffect(() => {
        TotalCasesCovidAPI();
    }, [TotalCasesCovidAPI]);






    if (loadingStatus === LOADING_STATE.idle || loadingStatus.pending) {
        return <div className={classes.main}>LOADING...</div>;
    }

    if (loadingStatus === LOADING_STATE.rejected) {
        return <div className={classes.main}>Error</div>;
    }
    if (!dataCases) {
        return (
            <div className={classes.main}>
                <span className={classes.error}>Something went wrong! Try search again (:</span>
            </div>
        );
    }

    if (dataCases.length===0) {
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
                label: 'Cases',
                fill: true,
                tooltip:false,
                borderWidth:0,
                lineTension: 0.5,
                drawBorder:false,
                drawTicks:false,
                display:false,
                scales: { xAxes: [{ display: false, }], yAxes: [{ display: false, }], },
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,0.3)',
                data: mappedCases,
            }
        ],
        legend: {
            display: false,
        },
        scales: { xAxes: [{ display: false, }], yAxes: [{ display: false, }], },
    }



        return(<div className={classes.main}>
            <h1 className={classes.title}>Total cases</h1>
            <div className={classes.chartDiv}>
                <Bar data={state} options={{maintainAspectRatio: false}} height={85} width={233}/>
            </div>
            </div>
        )
}
export default TotalCountryStatistics