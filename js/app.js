import { CONFIG } from "./config.js";
import { getCalendarEvents } from "./calendar.js";
import { createGame, createTeamEvent } from "./model.js";
import { renderSchedulePage } from "./renderer.js";
import { sortScheduleItems } from "./utils.js";

async function start() {

    console.log("El Mo Hoops Schedule starting...");

    try {
        const scheduleItems = [];
        
        for (const calendar of Object.values(CONFIG.calendars)) {
            if (!calendar.enabled)
                continue;
        
            const events =
                await getCalendarEvents(calendar.id);
        
            events.forEach(event => {
                const scheduleItem = calendar.type === "event"
                    ? createTeamEvent(calendar, event)
                    : createGame(calendar, event);

                scheduleItems.push(scheduleItem);
            });
        }
        
        sortScheduleItems(scheduleItems);

        renderSchedulePage(scheduleItems);
    }
    catch(error) {
        console.error("ERROR:");
        console.error(error);
    }
}

start();
