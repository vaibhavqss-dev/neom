export const Likeevent = async (event_id: string) => {
  const res = await fetch("http://localhost:3001/api/user/likeevent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      event_id: event_id,
    }),
  });
  const data = res.json();
  return data;
};

export const Unlikeevent = async (event_id: string) => {
  const res = await fetch("http://localhost:3001/api/user/likeevent", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      event_id: event_id,
    }),
  });
  const data = res.json();
  return data;
};
