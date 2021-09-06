import classes from './CountryDetail.module.css'

const CountryDetail = ({ country }) => {
    const { flag, population, capital, region, subregion, nativeName, name } = country
    console.log(country, 'country')
    return (<div className={classes.main}>

            <img className={classes.flag} alt={`flag of ${name}`} src={flag}/>
        <div className={classes.info}>
            <h2>{name}</h2>
            <h5>{nativeName}</h5>
            <ul className={classes.countryInfo}>
                <li>Population :{population?<span className={classes.span}>  {population.toLocaleString()}</span>:<span className={classes.span}>   NO DATA</span>}</li>
                <li>Capital :{capital?<span className={classes.span}>  {capital}</span>:<span className={classes.span}>   NO DATA</span>}</li>
                <li>Region :{region?<span className={classes.span}>  {region}</span>:<span className={classes.span}>   NO DATA</span>}</li>
                <li>subregion :{subregion?<span className={classes.span}>  {subregion}</span>:<span className={classes.span}>   NO DATA</span>}</li>
            </ul>
        </div>
    </div>)
}
export default CountryDetail

//flag, population, capital, region, subregion, nativeName, name