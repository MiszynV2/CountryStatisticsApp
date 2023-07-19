const CountryInfos = async (iso) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${iso}`);
  console.log("CountryInfos   ", iso);

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

const totalPopulationOfWorldByCountryAPI = async () => {
  console.log("totalPopulationOfWorldByCountryAPI   ");
  const response = await fetch(
    `https://restcountries.com/v3.1/all`,
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

const totalPopulationCovidAPI = async (iso) => {
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

const API = {
  totalPopulationOfWorldByCountryAPI,
  CountryInfos,
  totalPopulationCovidAPI,
  totalPKBCovidAPI,
  totalUrbanizationCovidAPI,
};

export default API;
