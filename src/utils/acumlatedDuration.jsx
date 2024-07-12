export const acumulatedDuration = (duration) => {
  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration % 3600) / 60);
  let seconds = Math.floor(duration % 60);
  return `${hours}:${minutes}:${seconds}`;
}