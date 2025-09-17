import api from "./api";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface VerifyData{
  token: string;
  email: string;
}

export const signupUser = async (data: SignupData) => {
  const response = await api.post("/auth/create-account", data); 
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const forgetPassword = async (email: string) => {
  const response = await api.post('auth/forgot-password', {email});
  return response.data;
}

export const verifyResetCode = async (token: string, email: string) =>{
  const response = await api.post("auth/verify-reset-code", {token, email}); 
  return response.data;
}

export const resetPassword = async (email: string, new_password: string) =>{
  const response = await api.post("/auth/reset-password", {email, new_password}); 
  return response.data;
}
