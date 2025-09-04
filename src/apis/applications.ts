import api from "./api"; 

// Fetch all applications
export const fetchApplications = async () => {
  const res = await api.get("/applications/my-applications");
  return res.data.data; // assuming your API response follows { data: [...] }
};

// Fetch single application (optional)
export const fetchApplicationById = async (id: string) => {
  const res = await api.get(`/applications/my-applications/${id}`);
  return res.data.data;
};
