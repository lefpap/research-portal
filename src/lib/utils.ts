import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: string = "en-UK") {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function normalizePath(path: string) {
  return path.replace(/\/+$/, "").toLowerCase();
}

export function sortByDateRange<T>(
  entries: T[],
  getStartDate: (entry: T) => string | Date,
  getEndDate: (entry: T) => string | Date | undefined,
) {
  return entries.sort((a, b) => {
    const aStart = new Date(getStartDate(a));
    const bStart = new Date(getStartDate(b));

    // If start dates are the same, sort by end date
    if (aStart.getTime() === bStart.getTime()) {
      const aEnd = getEndDate(a) ? new Date(getEndDate(a)!) : new Date();
      const bEnd = getEndDate(b) ? new Date(getEndDate(b)!) : new Date();
      return aEnd.getTime() - bEnd.getTime(); // Descending order of end dates
    }

    return bStart.getTime() - aStart.getTime(); // Descending order of start dates
  });
}
