export function formatDate(date: string): string | null {
  if (!date) {
    return null;
  }
  return new Date(date).toLocaleString();
}
