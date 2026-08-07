import { CONFIG } from "./config.js";

export function renderSchedule(games) {

    const container = document.getElementById("schedule");
    container.innerHTML = "";

    renderSubscribeButtons(container);

    if (games.length === 0) {
        renderEmptyState(container);
    } else {
        const dayGroups = groupGamesByDay(games);
        console.log(dayGroups);
        renderGames(container, games);
    }
}

function renderSubscribeButtons(container) {
    const section = document.createElement("section");
    section.className = "schedule-subscribe";

    container.appendChild(section);
    
    const heading = document.createElement("h2");
    heading.className = "schedule-subscribe-title";
    heading.textContent = "Subscribe";
    
    section.appendChild(heading);

    const buttons = document.createElement("div");
    buttons.className = "schedule-subscribe-buttons";
    
    section.appendChild(buttons);

    Object.values(CONFIG.calendars).forEach(calendar => {
    
        if (!calendar.enabled)
            return;
    
        // create one button
        const button = document.createElement("a");
        button.className = "schedule-subscribe-button";
        button.style.borderTopColor = calendar.color;
        button.href = calendar.subscriptionUrl;
        button.target = "_blank";
        button.rel = "noopener noreferrer";
        button.textContent = calendar.name;
        buttons.appendChild(button);
    });
}

function renderEmptyState(container) {
    const empty = document.createElement("div");
    empty.className = "schedule-empty";

    const icon = document.createElement("div");
    icon.className = "schedule-empty-icon";
    icon.textContent = "🏀";

    const title = document.createElement("h2");
    title.textContent = "No Upcoming Games";

    const message1 = document.createElement("p");
    message1.textContent = "The El Modena basketball schedule will be updated as new games are added.";

    const message2 = document.createElement("p");
    message2.textContent = "Go Vanguards!";

    empty.appendChild(icon);
    empty.appendChild(title);
    empty.appendChild(message1);
    empty.appendChild(message2);

    container.appendChild(empty);
}

function groupGamesByDay(games) {
    const dayGroups = [];

    for (const game of games) {
        const key = game.gameDay;

        let group = dayGroups.find(
            g => g.date === key
        );

        if (!group) {
            group = {
                date: key,
                games: []
            };   
            dayGroups.push(group);
        }

        group.games.push(game);
    }

    return dayGroups;
}

function renderGames(container, games) {
    
    let currentDay = "";
    let dayGamesContainer = null;

    games.forEach(game => {

        const gameDay = formatGameDay(game.start);

        if (gameDay !== currentDay) {

            currentDay = gameDay;

            //
            // Create the day section
            //
            const daySection = document.createElement("section");
            daySection.className = "schedule-day";

            //
            // Date heading
            //
            const heading = document.createElement("h2");
            heading.className = "schedule-date";
            heading.textContent = gameDay;

            //
            // Card container
            //
            dayGamesContainer = document.createElement("div");
            dayGamesContainer.className = "schedule-day-games";

            //
            // Build hierarchy
            //
            daySection.appendChild(heading);
            daySection.appendChild(dayGamesContainer);

            container.appendChild(daySection);
        }

        //
        // Add this game card to the current day
        //
        dayGamesContainer.appendChild(createGameCard(game));
    });
}

function createGameCard(game) {

    const card = document.createElement("article");
    card.className = "schedule-card";

    //
    // Create link to google calendar event
    //
    if (game.source?.htmlLink) {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            window.open(game.source.htmlLink, "_blank");
        });
    }

    //
    // Color Stripe
    //
    const stripe = document.createElement("div");
    stripe.className = "schedule-stripe";
    stripe.style.backgroundColor = game.teamColor;
    
    card.appendChild(stripe);
    
    //
    // Time
    //
    const time = document.createElement("div");
    time.className = "schedule-time";
    time.textContent = game.allDay ? "TBD" : formatGameTime(game.start);

    card.appendChild(time);

    //
    // Team
    //
    const team = document.createElement("div");
    team.className = "schedule-team";
    team.textContent = game.team;

    card.appendChild(team);

    //
    // Opponent
    //
    const opponent = document.createElement("div");
    opponent.className = "schedule-opponent";
    opponent.textContent = `${game.homeAway} ${game.opponent}`;

    card.appendChild(opponent);

    //
    // Location
    //
    const location = document.createElement("a");
    location.className = "schedule-location";
    location.textContent = `📍 ${game.shortLocation}`;
    const mapsUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(game.location);
    location.href = mapsUrl;
    location.target = "_blank";
    location.rel = "noopener noreferrer";
    location.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    card.appendChild(location);

    //
    // Optional notes
    //
    if (game.description) {
        const notes = document.createElement("div");
        notes.className = "schedule-description";
        notes.textContent = game.description;

        card.appendChild(notes);
    }

    return card;
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
