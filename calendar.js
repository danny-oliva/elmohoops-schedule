import { CONFIG } from "./config.js";

export async function getCalendarEvents(calendarId) {

    const params = new URLSearchParams({
        key: CONFIG.apiKey,
        singleEvents: "true",
        orderBy: "startTime",
        timeMin: new Date().toISOString()
    });


    const url =
        "https://www.googleapis.com/calendar/v3/calendars/" +
        encodeURIComponent(calendarId) +
        "/events?" +
        params;

    console.log("Request URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        console.error("Google API response:", data);
        throw new Error(
            `Google Calendar API error: ${response.status}`
        );
    }

    return data.items || [];
}
