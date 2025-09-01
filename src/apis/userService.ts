import api from "./api"; // your axios instance

export const saveUserTimezone = async (timezoneCode: string) => {
  const res = await api.post("/auth/add-timezone", { timezone: timezoneCode });
  return res.data;
};