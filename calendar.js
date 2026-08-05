import { CONFIG } from "./config.js";


export async function getCalendarEvents(calendarId) {

    const url =
        "https://www.googleapis.com/calendar/v3/calendars/" +
        encodeURIComponent(calendarId) +
        "/events" +
        "?key=" + CONFIG.apiKey +
        "&singleEvents=true" +
        "&orderBy=startTime" +
        "&timeMin=" + new Date().toISOString();


    console.log("Request URL:", url);


    const response = await fetch(url);


    if (!response.ok) {

        throw new Error(
            `Google Calendar API error: ${response.status}`
        );

    }


    const data = await response.json();

    return data.items || [];

}
