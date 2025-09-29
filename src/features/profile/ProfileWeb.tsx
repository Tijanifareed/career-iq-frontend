// pages/ProfileWeb.tsx
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPencilAlt, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import Sidebar from "../../components/Sidebar";
import Ticker from "../../components/TickerComponent";
import { getTimezoneAbbr } from "../../components/timezoneEnum";

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

export default function ProfileWeb() {
     const navigate = useNavigate();
     const fileRef = useRef<HTMLInputElement | null>(null);

     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(false);

     const [uploading, setUploading] = useState(false);
     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
     const [deleting, setDeleting] = useState(false);

     // Fetch profile
     useEffect(() => {
          const fetchProfile = async () => {
               try {
                    setLoading(true);
                    const res = await api.get("/users/user-profile");
                    localStorage.setItem("profile_picture", res.data.data.profile_picture);
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

     const profilePic = localStorage.getItem("profile_picture");

     // Check for null, "null", or empty string
     const validProfilePic =
          profilePic && profilePic !== "null" && profilePic.trim() !== ""
               ? profilePic
               : "/default_profile.png";

     // Save profile picture
     const saveProfilePicture = async (url: string) => {
          try {
               const res = await api.post("/users/profile-picture", { url });
               const newUser: User = res.data?.user ?? res.data;
               setUser(newUser);
               localStorage.removeItem("profile_picture")
               localStorage.setItem("profile_picture", newUser.profile_picture ?? "");
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

     // Helpers
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
               {/* Sidebar */}
               <div className="hidden md:block w-64 fixed h-screen border-r bg-white">
                    <Sidebar />
               </div>

               {/* Content */}
               <div className="flex-1 flex flex-col md:pl-64">
                    {/* Navbar */}

                    <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-2 bg-white border-b shadow-sm">
                         {/* Left: Ticker */}
                         <div className="flex-1">
                              <Ticker />
                         </div>

                         {/* Right: Profile image */}
                         <div className="flex-shrink-0">
                              <img
                                   src={validProfilePic}
                                   alt="user"
                                   className="w-9 h-9 rounded-full border object-cover"
                              />
                         </div>
                    </div>


                    {/* Main */}
                    <main className="flex-1 p-6 flex justify-center">
                         <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
                              <h1 className="text-2xl font-semibold mb-4">Profile</h1>

                              <div className="flex flex-col items-center">
                                   {/* Avatar */}
                                   <div className="relative">
                                        <img
                                             src={validProfilePic}
                                             alt="avatar"
                                             className={`w-32 h-32 rounded-full border object-cover ${uploading ? "opacity-60" : ""
                                                  }`}
                                        />
                                        <button
                                             onClick={() => fileRef.current?.click()}
                                             disabled={uploading}
                                             className="absolute -bottom-2 right-0 bg-white border p-2 rounded-full shadow disabled:opacity-50"
                                        >
                                             {uploading ? (
                                                  <svg
                                                       className="animate-spin h-4 w-4 text-gray-500"
                                                       viewBox="0 0 24 24"
                                                  >
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
                                             ) : (
                                                  <FaPencilAlt size={14} />
                                             )}
                                        </button>
                                        <input
                                             ref={fileRef}
                                             type="file"
                                             accept="image/*"
                                             onChange={onFilePicked}
                                             className="hidden"
                                        />
                                   </div>

                                   {/* Fields */}
                                   <div className="mt-5 w-full">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <div>
                                                  <p className="text-sm text-gray-500">Username</p>
                                                  <p className="text-lg font-medium">{user.username}</p>
                                             </div>
                                             <div>
                                                  <p className="text-sm text-gray-500">Timezone</p>
                                                  <p className="text-lg font-medium">
                                                       {getTimezoneAbbr(user.timezone) || "Not set"}
                                                  </p>
                                             </div>
                                        </div>
                                        <div className="mt-4">
                                             <p className="text-sm text-gray-500">Email</p>
                                             <p className="text-lg font-medium">{user.email}</p>
                                        </div>
                                   </div>

                                   {/* Actions */}
                                   <div className="mt-6 flex gap-3">
                                        <button
                                             onClick={() => navigate("/profile/edit")}
                                             className="px-4 py-2 bg-customBlue text-white rounded-md flex items-center gap-2"
                                        >
                                             <FaPencilAlt />
                                             Edit Profile
                                        </button>
                                        <button
                                             onClick={() => setShowDeleteConfirm(true)}
                                             className="px-4 py-2 border text-red-600 rounded-md flex items-center gap-2"
                                        >
                                             <FaTrash />
                                             Delete Account
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </main>
               </div>

               {/* Delete Confirmation */}
               {showDeleteConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                         <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                              <div className="flex justify-between items-start">
                                   <h3 className="text-lg font-semibold">Delete your account</h3>
                                   <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="text-gray-500"
                                   >
                                        <FaTimes />
                                   </button>
                              </div>
                              <p className="mt-3 text-sm text-gray-600">
                                   Are you sure you want to delete your account? Your data will be
                                   permanently removed. We’re sad to see you go.
                              </p>
                              <div className="mt-6 flex justify-end gap-3">
                                   <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-4 py-2 border rounded-md"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={deleteAccount}
                                        disabled={deleting}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
                                   >
                                        {deleting ? "Deleting..." : "Yes, delete"}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}
