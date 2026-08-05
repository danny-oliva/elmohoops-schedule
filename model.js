
function parseTitle(title, team) {

    // Remove the team name if it exists at the beginning
    let text = title;

    if (text.startsWith(team)) {
        text = text.substring(team.length).trim();
    }

    let gameType = "";
    let opponent = text;

    if (text.startsWith("vs ")) {
        gameType = "vs";
        opponent = text.substring(3).trim();
    }
    else if (text.startsWith("@")) {
        gameType = "@";
        opponent = text.substring(1).trim();
    }
    else if (text.toLowerCase().startsWith("at ")) {
        gameType = "@";
        opponent = text.substring(3).trim();
    }

    return {
        gameType,
        opponent
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
