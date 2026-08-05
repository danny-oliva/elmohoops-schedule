
function parseTitle(title) {

    let match = title.match(/\s(vs|@|at)\s(.+)/i);

    if (!match) {
        return {
            gameType: "",
            opponent: title
        };
    }

    return {
        gameType: match[1] === "at" ? "@" : match[1],
        opponent: match[2]
    };
}

export function createGame(calendar, event) {

    const parsed = parseTitle(event.summary, calendar.name);
    
    return {
        team: calendar.name,
        opponent: parsed.opponent,
        gameType: parsed.gameType,
        start: new Date(
            event.start.dateTime || event.start.date
        ),
        end: new Date(
            event.end.dateTime || event.end.date
        ),
        location: event.location || "",
        description: event.description || "",
        source: event
    };
}
