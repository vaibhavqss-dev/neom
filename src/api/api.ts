// get event data
export const get_data = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Login to login.");
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch data: ${err} from url ${url}`);
    console.log(err);
  }
};
 
// post_event_data
export const post_data = async (url: string, body: any) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Login to login.");
      return;
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch data: ${err} from url ${url}`);
  }
};
 
//delete event data
export const delete_data = async (url: string, body: any) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Login to login.");
      return;
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch data: ${err} from url ${url}`);
  }
};
 
// patch event_data
export const patch_data = async (url: string, body: any) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Login to login.");
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch data: ${err} from url ${url}`);
  }
};
