import { CONFIG } from "./config.js";
import { getCalendarEvents } from "./calendar.js";
import { createGame } from "./model.js";

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
        
        games.forEach(game => {
            console.log(
                `${game.team} ${game.gameType} ${game.opponent}`
            );
        });

    }
    catch(error) {

        console.error("ERROR:");
        console.error(error);

    }

}


start();
