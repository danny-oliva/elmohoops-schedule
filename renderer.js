export function renderGames(games) {

    const container = document.getElementById("schedule");

    container.innerHTML = "";

    games.forEach(game => {

        const gameDiv = document.createElement("div");

        const date = document.createElement("div");
        date.textContent = formatDate(game.start);

        const title = document.createElement("div");
        title.textContent =
            `${game.team} ${game.gameType} ${game.opponent}`;

        const location = document.createElement("div");
        location.textContent = game.location;

        gameDiv.appendChild(date);
        gameDiv.appendChild(title);
        gameDiv.appendChild(location);

        container.appendChild(gameDiv);
        container.appendChild(document.createElement("hr"));

    });

}

function formatDate(date) {

    return date.toLocaleString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });

}
