export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "";

  try {
    let date: Date;
    if (dateString.includes("T")) {
      date = new Date(dateString);
    } else if (dateString.includes("-")) {
      const parts = dateString.split("-");
      if (parts[0].length === 4) {
        date = new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2])
        );
      } else {
        date = new Date(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0])
        );
      }
    } else {
      return "";
    }
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch (e) {
    console.error("Error formatting date:", e);
    return "";
  }
};

export const formatDateForInput = (displayDate: string): string => {
  if (!displayDate) return "";

  try {
    if (displayDate.includes("T")) {
      const date = new Date(displayDate);
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
    if (displayDate.includes("-")) {
      const parts = displayDate.split("-");
      if (parts.length !== 3) return "";

      if (parts[0].length === 4) {
        return displayDate; // Already in correct format
      } else {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    return "";
  } catch (e) {
    console.error("Error formatting date for input:", e);
    return "";
  }
};
