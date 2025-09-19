import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPencilAlt, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import Sidebar from "../../components/Sidebar";
import Ticker from "../../components/TickerComponent";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

interface User {
     id: string;
     username: string;
     email: string;
     timezone: string;
     profile_picture?: string;
}

interface CloudinarySignature {
     signature: string;
     timestamp: string;
     api_key: string;
     cloud_name: string;
     folder: string;
}
export default function ProfileMobile() {
     const navigate = useNavigate();
     const fileRef = useRef<HTMLInputElement | null>(null);

     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(false);

     const [uploading, setUploading] = useState(false);
     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
     const [deleting, setDeleting] = useState(false);

     useEffect(() => {
          const fetchProfile = async () => {
               try {
                    setLoading(true);
                    const res = await api.get("/users/user-profile");
                    setUser(res.data?.data ?? res.data);
               } catch (err) {
                    console.error("Failed to fetch profile", err);
                    setError(true);
               } finally {
                    setLoading(false);
               }
          };

          fetchProfile();
     }, []);


     const saveProfilePicture = async (url: string) => {
          try {
               const res = await api.post("/users/profile-picture", { url });
               const newUser: User = res.data?.user ?? res.data;
               setUser(newUser);
               localStorage.removeItem("profile_picture")
               localStorage.setItem("profile_picture", newUser.profile_picture ?? "/default_profile.png");
          } catch (err) {
               console.error("Error saving profile picture", err);
               alert("Could not update profile picture.");
          }
     };

     // Delete account
     const deleteAccount = async () => {
          try {
               setDeleting(true);
               await api.delete("/delete-account");
               localStorage.removeItem("access_token");
               localStorage.removeItem("refresh_token");
               navigate("/login", { replace: true });
          } catch (err) {
               console.error("Delete account failed", err);
               alert("Failed to delete account.");
          } finally {
               setDeleting(false);
          }
     };


     const uploadToCloudinaryAndSave = async (file: File) => {
          if (file.size > MAX_FILE_SIZE) {
               alert("File too large. Max 2MB.");
               return;
          }

          try {
               const sigRes = await api.get("/cloudinary/signature");
               const sigData: CloudinarySignature = sigRes.data;

               const formData = new FormData();
               formData.append("file", file);
               formData.append("api_key", sigData.api_key);
               formData.append("timestamp", sigData.timestamp);
               formData.append("signature", sigData.signature);
               formData.append("folder", sigData.folder);

               setUploading(true);
               const uploadRes = await axios.post(
                    `https://api.cloudinary.com/v1_1/${sigData.cloud_name}/image/upload`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
               );

               const secureUrl: string = uploadRes.data.secure_url;
               await saveProfilePicture(secureUrl);
          } catch (err) {
               console.error("Upload error", err);
               alert("Upload failed. Try again.");
          } finally {
               setUploading(false);
          }
     };


     const onFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
               const file = e.target.files?.[0];
               if (!file) return;
               uploadToCloudinaryAndSave(file);
               e.target.value = "";
          };
     
     if (loading) {
          return (
               <div className="flex items-center justify-center min-h-screen">
                    <svg className="animate-spin h-8 w-8 text-gray-600" viewBox="0 0 24 24">
                         <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                         />
                         <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                         />
                    </svg>
               </div>
          );
     }     

     if (error || !user) {
          return <div className="p-6 text-red-600">Failed to load profile.</div>;
     }

     return (
          <div className="flex min-h-screen bg-gray-50">
               
          </div>
     );

}
