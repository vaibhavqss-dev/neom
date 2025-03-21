export interface Notification {
  id: string;
  msgid: number;
  message: string;
  event_id?: string;
  event_name?: string;
  timestamp: string;
  read: boolean;
}
