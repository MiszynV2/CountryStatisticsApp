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

const GDP = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/NY.GDP.MKTP.CD?format=json`
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

const Inflation = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/FP.CPI.TOTL.ZG?format=json`
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

const ForeignTrade = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/NE.EXP.GNFS.CD?format=json`
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

const PublicDebt = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/GC.DOD.TOTL.GD.ZS?format=json`
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

const SocialDevelopmentIndicators = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/NY.GNP.MKTP.CD?format=json`
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

const Unemployment = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SL.UEM.TOTL.ZS?format=json`
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

const totalPopulationOfWorldByCountryAPI = async () => {
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

const NumberOfStudents = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SE.SEC.ENRR?format=json`
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

const LiteracyAndNumeracyRates = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SE.ADT.LITR.ZS?format=json`
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

const EducationExpenditures = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SE.XPD.TOTL.GD.ZS?format=json`
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

const IlliteracyRate = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SE.ADT.LITR.ZS?format=json`
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

const ChildMortalityRates = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SP.DYN.LE00.IN?format=json`
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

const HealthExpenditures = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SH.DYN.MORT?format=json`
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

const LifeExpectancy = async (iso) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/${iso}/indicator/SH.XPD.CHEX.GD.ZS?format=json`
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
  Unemployment,
  GDP,
  Inflation,
  ForeignTrade,
  PublicDebt,
  SocialDevelopmentIndicators,
  NumberOfStudents,
  LiteracyAndNumeracyRates,
  EducationExpenditures,
  IlliteracyRate,
  ChildMortalityRates,
  HealthExpenditures,
  LifeExpectancy,
};

export default API;
