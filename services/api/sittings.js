let endpoint = "https://localhost:7271/api/sittings";

const getAvailable = async (startDate, endDate) =>
{
    let startDateIso = new Date(startDate).toISOString();

    if(endDate === undefined){
        return await fetch(`${endpoint}/available/${startDateIso}`)
                        .then( response => response.json());
    }
    let endDateIso = new Date(endDate).toISOString();
    return await fetch(`${endpoint}/available/${startDateIso}/${endDateIso}`)
                    .then( response => response.json());
};

const getDayTypes = async (date) =>
{
    return await fetch(`${endpoint}/day-types/${date.year}/${date.month}/${date.day}`)
                    .then( response => response.json());
};

const getDistinctAvailable = async (startDate, endDate) =>
{
    let startDateIso = new Date(startDate).toISOString();

    if(endDate === undefined){
        return await fetch(`${endpoint}/distinct-available/${startDateIso}`)
                        .then( response => response.json());
    }
    let endDateIso = new Date(endDate).toISOString();
    return await fetch(`${endpoint}/distinct-available/${startDateIso}/${endDateIso}`)
                    .then( response => response.json());
};

export { getAvailable, getDistinctAvailable, getDayTypes };