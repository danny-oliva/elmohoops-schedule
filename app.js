import { CONFIG } from "./config.js";
import { getCalendarEvents } from "./calendar.js";


async function start() {

    console.log("El Mo Hoops Schedule starting...");


    try {

        const events = await getCalendarEvents(
            CONFIG.calendars.varsity.id
        );


        console.log("Events returned:");
        console.log(events);


    }
    catch(error) {

        console.error("ERROR:");
        console.error(error);

    }

}


start();
