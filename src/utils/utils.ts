export function isToday(date: string): boolean {
  const todaysDate = new Date();

  return new Date(date).setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
}
