
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

function formatGameDay(date) {
    return date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function formatGameTime(date) {
    return date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
    });
}

export function createGame(calendar, event) {
    const parsed = parseTitle(event.summary);
    const allDay = !!event.start.date;
    const startTime = event.start.dateTime
        ? new Date(event.start.dateTime)
        : parseGoogleDate(event.start.date);
    const endTime = event.end.dateTime
        ? new Date(event.end.dateTime)
        : parseGoogleDate(event.end.date);
    const strGameDay = formatGameDay(startTime);
    const strGameTime = allDay ? "TBD" : formatGameTime(startTime);
    

    return {
        team: calendar.name,
        teamShortTeam: calendar.shortName,
        teamColor: calendar.color,
        opponent: parsed.opponent.replace(/\s*\[Time TBD\]\s*/i, ""),
        homeAway: parsed.homeAway,
        allDay: allDay,
        gameDay: strGameDay,
        gameTime: strGameTime,
        start: startTime,
        end: endTime,
        location: event.location || "",
        shortLocation: event.location ? event.location.split(",")[0] : "",
        description: event.description || "",
        source: event
    };
}
