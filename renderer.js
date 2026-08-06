export function renderGames(games) {

    const container = document.getElementById("schedule");
    container.innerHTML = "";


    if (games.length === 0) {
        renderEmptyState(container);
        return;
    }
    
    let currentDay = "";

    games.forEach(game => {

        const gameDay = formatGameDay(game.start);

        if (gameDay !== currentDay) {
            currentDay = gameDay;
            const heading = document.createElement("h2");
            heading.textContent = gameDay;
            heading.className = "schedule-date";
            container.appendChild(heading);
        }

        container.appendChild(createGameCard(game));
    });
}

function createGameCard(game) {

    const card = document.createElement("div");
    card.className = "schedule-game";

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

    // Use the team color from config.js
    team.style.color = game.color;

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
    const location = document.createElement("div");
    location.className = "schedule-location";
    location.textContent = `📍 ${game.shortLocation}`;

    card.appendChild(location);

    //
    // Optional notes
    //
    if (game.description) {
        const notes = document.createElement("div");
        notes.className = "schedule-notes";
        notes.textContent = game.description;

        card.appendChild(notes);
    }

    return card;
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
