import { get_data, post_data, delete_data, patch_data } from "../api/api";

export const Likeevent = async (event_id: string) => {
  return await post_data(`/user/likeevent`, {
    event_id: event_id,
  });
};

export const Unlikeevent = async (event_id: string) => {
  return await delete_data(`/user/likeevent`, {
    event_id: event_id,
  });
};

export const notification_read = async (msgId: string) => {
  return await patch_data(`/user/notification`, {
    msgId: msgId,
  });
};

export const notification_delete = async (msgId: string) => {
  return await delete_data(`/user/notification`, {
    msgId: msgId,
  });
};
