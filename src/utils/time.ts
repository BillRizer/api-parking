export function getCurrentTimeUTC(): string {
  return new Date(Date.now()).toUTCString();
}
