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

function formatScheduleDay(date) {
    return date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function formatScheduleTime(date) {
    return date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
    });
}

function getEventTimes(event) {
    const allDay = !!event.start.date;
    const startTime = event.start.dateTime
        ? new Date(event.start.dateTime)
        : parseGoogleDate(event.start.date);
    const endTime = event.end.dateTime
        ? new Date(event.end.dateTime)
        : parseGoogleDate(event.end.date);

    return { allDay, startTime, endTime };
}

function createCommonFields(calendar, event) {
    const { allDay, startTime, endTime } = getEventTimes(event);

    return {
        type: calendar.type,
        teamColor: calendar.color,
        allDay,
        gameDay: formatScheduleDay(startTime),
        gameTime: allDay ? "TBD" : formatScheduleTime(startTime),
        start: startTime,
        end: endTime,
        location: event.location || "",
        shortLocation: event.location ? event.location.split(",")[0] : "",
        description: event.description || "",
        source: event
    };
}

export function createGame(calendar, event) {
    const parsed = parseTitle(event.summary);

    return {
        ...createCommonFields(calendar, event),
        team: calendar.name,
        teamShortTeam: calendar.shortName,
        opponent: parsed.opponent.replace(/\s*\[Time TBD\]\s*/i, ""),
        homeAway: parsed.homeAway
    };
}

export function createTeamEvent(calendar, event) {
    const item = createCommonFields(calendar, event);

    return {
        ...item,
        title: event.summary || "Team Event",
        endTime: item.allDay ? "" : formatScheduleTime(item.end)
    };
}
