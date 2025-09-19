import api from "./api"; // 👈 use your axios instance
import axios from "axios"; // still needed for direct Cloudinary upload

async function uploadProfilePicture(file: File) {
  // 1. get signed params from backend (uses your api instance)
  const { data: sigData } = await api.get("/cloudinary/signature");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sigData.api_key);
  formData.append("timestamp", sigData.timestamp);
  formData.append("signature", sigData.signature);
  formData.append("folder", sigData.folder);

  // 2. upload directly to Cloudinary (raw axios, not api, because different domain)
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${sigData.cloud_name}/image/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  const imageUrl = res.data.secure_url;

  // 3. notify backend to save URL (use your api instance again)
  await api.post("/profile-picture", { url: imageUrl });

  return imageUrl;
}

export default uploadProfilePicture;
