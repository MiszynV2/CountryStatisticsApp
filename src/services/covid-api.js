const CountryInfos = async (iso) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${iso}`);

  if (!response.ok) {
    return {
      isOK: false,
    };
  }
  return {
    isOk: true,
    data: await response.json(),
  };
};

const total = async () => {
  const response = await fetch(`https://covid19.mathdro.id/api/daily`);

  if (!response.ok) {
    return {
      isOK: false,
    };
  }
  return {
    isOk: true,
    data: await response.json(),
  };
};

const byCountry = async (code) => {
  const response = await fetch(
    `https://covid-19-data.p.rapidapi.com/report/country/code?code=${code.toLowerCase()}&date=2020-04-01`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "4ea47fdc47mshd5f1a2bb4ffc58cp1d8648jsncdd3c5e8bf93",
      },
    }
  );

  if (!response.ok) {
    return {
      isOK: false,
    };
  }
  return {
    isOk: true,
    data: await response.json(),
  };
};

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const totalPopulationCovidAPI = async (iso) => {
  console.log("totalCasesCovidAPI country name", iso);
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SP.POP.TOTL?format=json`,
    requestOptions
  );

  if (!response.ok) {
    return {
      isOK: false,
    };
  }
  return {
    isOk: true,
    data: await response.json(),
  };
};
const totalPKBCovidAPI = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/NY.GDP.MKTP.CD?format=json`,
    requestOptions
  );

  if (!response.ok) {
    return {
      isOK: false,
    };
  }
  return {
    isOk: true,
    data: await response.json(),
  };
};
const totalUrbanizationCovidAPI = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SP.DYN.LE00.IN?format=json`,
    requestOptions
  );

  if (!response.ok) {
    return {
      isOK: false,
    };
  }
  return {
    isOk: true,
    data: await response.json(),
  };
};
export default {
  CountryInfos,
  total,
  byCountry,
  totalPopulationCovidAPI,
  totalPKBCovidAPI,
  totalUrbanizationCovidAPI,
};
