export function isToday(date: string): boolean {
  const todaysDate = new Date();

  return new Date(date).setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
}

// e.g. await delay(3000);
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
