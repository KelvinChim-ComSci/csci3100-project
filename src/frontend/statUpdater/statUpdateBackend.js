export function statBackendUpdate(newStat) {
    fetch(process.env.REACT_APP_BASE_URL + "/stat/update", {
        method: "POST",
        headers: new Headers({
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true,
        }),
        body: JSON.stringify({
            gpa: newStat.gpa,
            happiness: newStat.happiness,
            money: newStat.money,
            sem: newStat.sem,
            year: newStat.year,
            sports: newStat.sports,
            stamina: newStat.stamina,
            userId: newStat.user,
        }),
    })
    .then((data) => data.json())
    .then((data) => console.log(data.message));
}