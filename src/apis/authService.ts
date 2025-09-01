import api from "./api";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const signupUser = async (data: SignupData) => {
  const response = await api.post("/auth/create-account", data); // adjust endpoint
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};
