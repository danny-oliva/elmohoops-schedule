
function parseGoogleDate(dateString) {
    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    return new Date(year, month - 1, day);
}

function parseTitle(title) {
    let match = title.match(/\s(vs|@|at)\s(.+)/i);

    if (!match) {
        return {
            homeAway: "",
            opponent: title
        };
    }

    return {
        homeAway: match[1] === "at" ? "@" : match[1],
        opponent: match[2]
    };
}

export function createGame(calendar, event) {
    const parsed = parseTitle(event.summary);
    const allDay = !!event.start.date;

    return {
        team: calendar.name,
        teamShortTeam: calendar.shortName,
        teamColor: calendar.color,
        opponent: parsed.opponent.replace(/\s*\[Time TBD\]\s*/i, ""),
        homeAway: parsed.homeAway,
        allDay: allDay,
        start: event.start.dateTime
            ? new Date(event.start.dateTime)
            : parseGoogleDate(event.start.date),
        end: event.end.dateTime
            ? new Date(event.end.dateTime)
            : parseGoogleDate(event.end.date),
        location: event.location || "",
        shortLocation: event.location ? event.location.split(",")[0] : "",
        description: event.description || "",
        source: event
    };
}
