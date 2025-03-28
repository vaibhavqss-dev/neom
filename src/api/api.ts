import {
  checkAuthToken,
  handleApiResponse,
  handleApiError,
} from "../utils/ApiErrorHandler";

// get event data
export const get_data = async (url: string) => {
  try {
    const token = checkAuthToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    handleApiResponse(res);
    return res.json();
  } catch (err) {
    return handleApiError(err, url);
  }
};

// post_event_data
export const post_data = async (url: string, body: any) => {
  try {
    const token = checkAuthToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    handleApiResponse(res);
    return res.json();
  } catch (err) {
    return handleApiError(err, url);
  }
};

//delete event data
export const delete_data = async (url: string, body: any) => {
  try {
    const token = checkAuthToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    handleApiResponse(res);
    return res.json();
  } catch (err) {
    return handleApiError(err, url);
  }
};

// patch event_data
export const patch_data = async (url: string, body: any) => {
  try {
    const token = checkAuthToken();
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    handleApiResponse(res);
    return res.json();
  } catch (err) {
    return handleApiError(err, url);
  }
};
