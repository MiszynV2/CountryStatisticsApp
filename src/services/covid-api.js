const total = async () => {
    const response = await fetch(
        "https://covid-19-data.p.rapidapi.com/report/totals?date=2020-07-21",
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key":
                    "4ea47fdc47mshd5f1a2bb4ffc58cp1d8648jsncdd3c5e8bf93",
            },
        }
    )

    if (!response.ok) {
        return {
            isOK: false
        }
    }
    return {
        isOk: true,
        data: await response.json()
    }
}

const byCountry = async (code) => {
    const response = await fetch(
        `https://covid-19-data.p.rapidapi.com/report/country/code?code=${code.toLowerCase()}&date=2020-04-01`,
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key":
                    "4ea47fdc47mshd5f1a2bb4ffc58cp1d8648jsncdd3c5e8bf93",
            },
        }
    );

    if (!response.ok) {
        return {
            isOK: false
        }
    }
    return {
        isOk: true,
        data: await response.json()
    }
}

export default {
    total, byCountry
}