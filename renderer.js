export function renderGames(games) {

    const container = document.getElementById("schedule");

    container.innerHTML = "";

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

        const title = document.createElement("div");
        title.textContent = `${game.team} ${game.gameType} ${game.opponent}`;
        title.className = "schedule-title";

        const location = document.createElement("div");
        location.textContent = shortLocation(game.location);
        location.className = "schedule-location";

        gameDiv.appendChild(time);
        gameDiv.appendChild(title);
        gameDiv.appendChild(location);

        container.appendChild(gameDiv);
        container.appendChild(document.createElement("div"));

    });

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
