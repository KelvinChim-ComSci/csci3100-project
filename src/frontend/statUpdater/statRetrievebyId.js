/**************************************************************************************** 
This component is activated when the user statistics have to be retrieved.

Last updated: 5/5/2022 by Ho Cheuk Hin
****************************************************************************************/

//fetch statistics from database by userID
export async function statRetrievebyId(ID) {
    return fetch(process.env.REACT_APP_BASE_URL + "/stat/retrieve/" + ID, {
        method: "GET",
        headers: new Headers({
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true,
        })
    })
    .then((res) => res.json())
}