/**************************************************************************************** 
This component is activated after clicking the "Gift!" button in the friend list. By
clicking the button, the system will send the gift to friend and update to the database.
After the friend has received the gift, their stamina will increase.

Last updated: 29/4/2022 by Chim Ka Chun
****************************************************************************************/

//Get the current time
export function getFormattedTime() {
    const currentFullDate = new Date();
    let currentDate = `${currentFullDate.getFullYear()}-${('0' + (currentFullDate.getMonth() + 1)).slice(-2)}-${('0' + currentFullDate.getDate()).slice(-2)}`;
    let currentTime = `${('0' + currentFullDate.getHours()).slice(-2)}:${('0' + currentFullDate.getMinutes()).slice(-2)}:${('0' + currentFullDate.getSeconds()).slice(-2)}`;

    return [currentDate, currentTime];
}

// Save the gift to the database
export async function giftToBackend(userId, friendId) {
    return await fetch(process.env.REACT_APP_BASE_URL + "/friend/sendGiftToFriend", {
        method: "POST",
        headers: new Headers({
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true,
        }),
        body: JSON.stringify({
            userId: userId,
            friendId: friendId
        }),
    })
    .then((res) => res.json())
}

