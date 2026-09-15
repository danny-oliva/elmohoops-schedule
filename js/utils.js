export function sortScheduleItems(items) {
    return items.sort((a, b) => a.start - b.start);
}
