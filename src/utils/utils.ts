export function isToday(date: string): boolean {
  const todaysDate = new Date();

  return new Date(date).setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
}

// e.g. await delay(3000);
// eslint-disable-next-line no-promise-executor-return
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
