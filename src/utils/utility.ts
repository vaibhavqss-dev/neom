// Format date for API request - fixed to handle edge cases
export function formatDateForAPI(dateString: string): string {
  if (!dateString) return "";

  try {
    // Convert YYYY-MM-DD to a readable format
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "";
    }
    return date.toDateString(); // Format like "Sat May 03 2025"
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

// Format date for display - with improved error handling
export function formatDateForDisplay(dates: string[]): string {
  if (!dates || !Array.isArray(dates) || dates.length === 0) return "";

  try {
    if (dates.length === 1) {
      return formatSingleDate(dates[0]);
    } else {
      return `${formatSingleDate(dates[0])} - ${formatSingleDate(
        dates[dates.length - 1]
      )}`;
    }
  } catch (error) {
    console.error("Error formatting display date:", error, dates);
    return "";
  }
}

export function formatSingleDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return the original string if parsing fails
    }
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  } catch (error) {
    console.error("Error formatting single date:", error, dateString);
    return dateString;
  }
}

// Format time for display - with improved error handling
export function formatTimeForDisplay(times: string[]): string {
  if (!times || !Array.isArray(times) || times.length === 0) return "";

  try {
    const formatTime = (timeStr: string) => {
      try {
        const parts = timeStr.split(":");
        if (parts.length < 2) return timeStr; // Return original if can't parse

        const hours = parseInt(parts[0]);
        const minutes = parts[1];

        if (isNaN(hours)) return timeStr; // Return original if can't parse

        const ampm = hours >= 12 ? "PM" : "AM";
        const hour12 = hours % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
      } catch (e) {
        return timeStr; // Return original on any error
      }
    };

    if (times.length === 1) {
      return formatTime(times[0]);
    } else {
      return `${formatTime(times[0])} - ${formatTime(times[times.length - 1])}`;
    }
  } catch (error) {
    console.error("Error formatting time:", error, times);
    return "";
  }
}