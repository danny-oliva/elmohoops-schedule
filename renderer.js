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

        const gameDiv = document.createElement("div");
        gameDiv.className = "schedule-game";

        const time = document.createElement("div");
        if (game.allDay) {
            time.textContent = "TBD";
        } else {
            time.textContent = formatGameTime(game.start);
        }
        time.className = "schedule-time";

        const title1 = document.createElement("div");
        title1.textContent = `${game.team}`;
        title1.className = "schedule-title";

        const title2 = document.createElement("div");
        title2.textContent = `${game.homeAway} ${game.opponent}`;
        title2.className = "schedule-title";

        const location = document.createElement("div");
        location.textContent = shortLocation(game.location);
        location.className = "schedule-location";

        gameDiv.appendChild(time);
        gameDiv.appendChild(title1);
        gameDiv.appendChild(title2);
        gameDiv.appendChild(location);

        container.appendChild(gameDiv);
        container.appendChild(document.createElement("div"));

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

function shortLocation(location) {
    return location.split(",")[0];
}
