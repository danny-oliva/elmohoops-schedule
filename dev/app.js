import { CONFIG } from "./config.js";
import { getCalendarEvents } from "./calendar.js";
import { createGame } from "./model.js";
import { renderSchedulePage } from "./renderer.js";
import { sortGames } from "./utils.js";

async function start() {

    console.log("El Mo Hoops Schedule starting...");


    try {
        const games = [];
        
        for (const calendar of Object.values(CONFIG.calendars)) {
            if (!calendar.enabled)
                continue;
        
            const events =
                await getCalendarEvents(calendar.id);
        
            events.forEach(event => {
                games.push(
                    createGame(calendar, event)
                );
            });
        }
        
        games.sort((a, b) => a.start - b.start);
        
        renderSchedulePage(games);
    }
    catch(error) {
        console.error("ERROR:");
        console.error(error);
    }
}

start();
