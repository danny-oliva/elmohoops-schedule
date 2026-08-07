import { CONFIG } from "./config.js";

const DAYS_PER_PAGE = 4;
let currentPage = 0;
let totalPages = 0;
let dayGroups = [];

export function renderSchedulePage(games) {

    if (games.length === 0) {
        const container = document.getElementById("schedule");
        container.innerHTML = "";
    
        renderSubscribeButtons(container);
        renderEmptyState(container);
    } else {
        dayGroups = groupGamesByDay(games);
        renderSchedule();
    }
}

function renderSchedule() {
    const container = document.getElementById("schedule");
    container.innerHTML = "";

    renderSubscribeButtons(container);
    const page = getCurrentPage(dayGroups);
    renderGames(container, page);
    renderPagination(container, dayGroups);
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
            g => g.gameDay === key
        );
        if (!group) {
            group = {
                gameDay: key,
                games: []
            };   
            dayGroups.push(group);
        }
        group.games.push(game);
    }
    return dayGroups;
}

function renderPagination(container, dayGroups) {
    totalPages = Math.ceil(dayGroups.length / DAYS_PER_PAGE);

    if (totalPages <= 1)
        return;

    const nav = document.createElement("nav");
    nav.className = "schedule-pagination";

    // Content wrapper
    const content = document.createElement("div");
    content.className = "schedule-pagination-content";

    const previous = document.createElement("button");
    previous.textContent = "← Prev";

    const label = document.createElement("span");
    label.className = "schedule-page-label";
    label.textContent = `${currentPage + 1} / ${totalPages}`;

    const next = document.createElement("button");
    next.textContent = "Next →";

    content.appendChild(previous);
    content.appendChild(label);
    content.appendChild(next);
    
    nav.appendChild(content);

    container.appendChild(nav);
}

function renderGames(container, dayGroups) {

    for (const dayGroup of dayGroups) {
        const daySection = createDaySection(dayGroup);

        const dayGamesContainer = document.createElement("div");
        dayGamesContainer.className = "schedule-day-games";

        for (const game of dayGroup.games) {
            dayGamesContainer.appendChild(createGameCard(game));
        }

        daySection.appendChild(dayGamesContainer);
        container.appendChild(daySection);
    }
}

function createDaySection(dayGroup) {
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
    heading.textContent = dayGroup.gameDay;

    //
    // Card container
    //
    //dayGamesContainer = document.createElement("div");
    //dayGamesContainer.className = "schedule-day-games";

    //
    // Build hierarchy
    //
    daySection.appendChild(heading);
    //daySection.appendChild(dayGamesContainer);

    return daySection;
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
    time.textContent = game.gameTime;

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

function getCurrentPage(dayGroups) {
    const start = currentPage * DAYS_PER_PAGE;
    const end = start + DAYS_PER_PAGE;
    return dayGroups.slice(start, end);
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        renderSchedule();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        renderSchedule();
    }
}
