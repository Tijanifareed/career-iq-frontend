import api from "./api"; 

export const saveUserTimezone = async (timezoneCode: string) => {
  const res = await api.post("/auth/add-timezone", { timezone: timezoneCode });
  return res.data;
};