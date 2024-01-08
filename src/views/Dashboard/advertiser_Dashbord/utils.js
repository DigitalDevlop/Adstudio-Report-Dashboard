export function formatNumber(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function truncateTextAfterUnderscore(text) {
  const indexOfUnderscore = text.indexOf("_");
  return indexOfUnderscore !== -1
    ? text.substring(indexOfUnderscore + 1)
    : text;
}
