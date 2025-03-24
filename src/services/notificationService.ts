import { Notification } from "../types/notification";

// Keep track of the abort controller to cancel fetch requests
let abortController: AbortController | null = null;
const listeners: ((notification: Notification) => void)[] = [];

// Parse SSE messages from text chunks
const parseSSEMessages = (chunk: string): { data: string }[] => {
  const messages: { data: string }[] = [];
  const eventStrings = chunk.split("\n\n").filter((str) => str.trim() !== "");

  for (const eventString of eventStrings) {
    const messageLines = eventString.split("\n");
    const messageData: { data: string } = { data: "" };

    for (const line of messageLines) {
      if (line.startsWith("data:")) {
        messageData.data = line.slice(5).trim();
      }
    }

    if (messageData.data) {
      messages.push(messageData);
    }
  }

  return messages;
};

export const startNotificationService = async (): Promise<void> => {
  if (abortController) {
    return;
  }

  abortController = new AbortController();
  const signal = abortController.signal;

  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      "http://localhost:3001/api/user/notification",
      {
        method: "GET",
        headers: {
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
          Authorization: `Bearer ${token}`,
          Origin: window.location.origin,
        },
        credentials: "include",
        mode: "cors",
        signal,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (!signal.aborted) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const messages = parseSSEMessages(buffer);
      const lastNewlineIndex = buffer.lastIndexOf("\n\n");
      buffer =
        lastNewlineIndex > -1 ? buffer.slice(lastNewlineIndex + 2) : buffer;
      for (const message of messages) {
        try {
          const notification = JSON.parse(message.data) as Notification;
          listeners.forEach((listener) => listener(notification));
        } catch (error) {
          console.error("Error parsing notification:", error);
        }
      }
    }
  } catch (error) {
    if (!signal.aborted) {
      console.error("Error fetching notifications:", error);
      closeConnection();
      setTimeout(() => {
        startNotificationService();
      }, 5000);
    }
  }
};

export const closeConnection = (): void => {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
};

export const addNotificationListener = (
  callback: (notification: Notification) => void
): (() => void) => {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
};
