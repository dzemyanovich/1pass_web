export function formatDate(date: Date): string | null {
  if (!date) {
    return null;
  }
  return new Date(date.toString()).toLocaleString();
}
