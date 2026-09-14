export function sortGames(games) {
    return games.sort((a, b) => a.start - b.start);
}
