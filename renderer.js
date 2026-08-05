export function renderGames(games) {

    const container = document.getElementById("schedule");

    container.innerHTML = "";

    games.forEach(game => {

        const div = document.createElement("div");

        div.textContent =
            `${formatDate(game.start)}
${game.team} ${game.gameType} ${game.opponent}
${game.location}`;

        container.appendChild(div);

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
