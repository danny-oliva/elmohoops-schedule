import { CONFIG } from "./config.js";
import { getCalendarEvents } from "./calendar.js";
import { createGame } from "./model.js";
import { renderGames } from "./renderer.js";

async function start() {

    console.log("El Mo Hoops Schedule starting...");


    try {

        const events = await getCalendarEvents(
            CONFIG.calendars.varsity.id
        );

        const games = events.map(event =>
            createGame(
                CONFIG.calendars.varsity,
                event
            )
        );
        console.log(games[0]);
        renderGames(games);
    }
    catch(error) {

        console.error("ERROR:");
        console.error(error);

    }

}

start();
