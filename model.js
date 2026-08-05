export function createGame(calendar, event) {

    return {

        team: calendar.name,

        title: event.summary,

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
