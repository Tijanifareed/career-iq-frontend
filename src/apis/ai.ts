// src/api/ai.ts
import api from "./api";

export async function analyzeResume(formData: FormData) {
  const response = await api.post("/ai/resume/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // override JSON
    },
  });
  return response.data;
}
