import React, { useEffect, useRef, useState } from "react";
import { FaPencilAlt, FaTrash, FaTimes, FaSignOutAlt, FaHome, FaFileAlt, FaRobot, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../apis/api";
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

export default function ProfileMobile() {
     const navigate = useNavigate();
     const fileRef = useRef<HTMLInputElement | null>(null);

     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);
     const [uploading, setUploading] = useState(false);
     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
     const [deleting, setDeleting] = useState(false);

     // Fetch profile
     useEffect(() => {
          const fetchProfile = async () => {
               try {
                    setLoading(true);
                    const res = await api.get("/users/user-profile");
                    setUser(res.data?.data ?? res.data);
               } catch (err) {
                    console.error("Failed to fetch profile", err);
               } finally {
                    setLoading(false);
               }
          };
          fetchProfile();
     }, []);

     // Save profile picture
     const saveProfilePicture = async (url: string) => {
          try {
               const res = await api.post("/users/profile-picture", { url });
               const newUser: User = res.data?.user ?? res.data;
               setUser(newUser);
               localStorage.setItem(
                    "profile_picture",
                    newUser.profile_picture ?? "/default_profile.png"
               );
          } catch (err) {
               console.error("Error saving profile picture", err);
               alert("Could not update profile picture.");
          }
     };

     // Upload to Cloudinary
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

     const handleLogout = () => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login", { replace: true });
     };

     const deleteAccount = async () => {
          try {
               setDeleting(true);
               await api.delete("/delete-account");
               localStorage.clear();
               navigate("/login", { replace: true });
          } catch (err) {
               console.error("Delete account failed", err);
               alert("Failed to delete account.");
          } finally {
               setDeleting(false);
          }
     };

     if (loading) {
          return (
               <div className="flex items-center justify-center min-h-screen">
                    <svg
                         className="animate-spin h-8 w-8 text-gray-600"
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
               </div>
          );
     }

     if (!user) {
          return <div className="p-6 text-red-600">Failed to load profile.</div>;
     }

     return (
          <div className="flex flex-col min-h-screen bg-gray-50 pb-14">
               {/* Header */}
               <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-4 text-center font-semibold text-lg">
                    Profile
               </div>

               {/* Main content */}
               <div className="flex-1 flex flex-col items-center p-6">
                    {/* Avatar */}
                    <div className="relative">
                         <img
                              src={user.profile_picture ?? "/default-avatar.png"}
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
                    <div className="mt-6 w-full space-y-4">
                         <div>
                              <p className="text-sm text-gray-500">Username</p>
                              <p className="text-lg font-medium">{user.username}</p>
                         </div>
                         <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="text-lg font-medium">{user.email}</p>
                         </div>
                         <div>
                              <p className="text-sm text-gray-500">Timezone</p>
                              <p className="text-lg font-medium">
                                   {getTimezoneAbbr(user.timezone) || "Not set"}
                              </p>
                         </div>
                    </div>

                    {/* Logout + Delete */}

                    <div className="mt-auto w-full space-y-3 mb-6 pt-8 sm:pt-12 relative">
                         {/* Gradient divider line with shine */}

                         {/* Upgrade Button */}
                         <button
                              disabled
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-customBlue text-white opacity-80 cursor-not-allowed relative overflow-hidden"
                         >
                              <span className="relative z-10">🚀 Upgrade</span>
                              <span className="text-xs italic relative z-10">(Coming Soon)</span>

                              {/* Shining overlay */}
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-slide" />
                         </button>

                         {/* Logout Button */}
                         <button
                              onClick={handleLogout}
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                         >
                              <FaSignOutAlt />
                              <span>Logout</span>
                         </button>

                         {/* Delete Account Button */}
                         <button
                              onClick={() => setShowDeleteConfirm(true)}
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-red-600"
                         >
                              <FaTrash />
                              Delete Account
                         </button>
                    </div>

               </div>

               {/* Floating edit button */}
               <button
                    onClick={() => navigate("/profile/edit")}
                    className="fixed bottom-24 right-6 p-4 rounded-full bg-customBlue text-white shadow-lg"
               >
                    <FaPencilAlt />
               </button>

               {/* Bottom Navbar */}
               <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2">
                    <NavItem label="Dashboard" icon={<FaHome />} to="/dashboard" />
                    <NavItem label="Applications" icon={<FaFileAlt />} to="/applications" />
                    <NavItem
                         label="Resume AI"
                         icon={<FaRobot />}
                         to="/ai/resume/feedback"
                    />
                    <NavItem label="Profile" icon={<FaUser />} to="/my-profile" />
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

/* Bottom nav item component */
function NavItem({
     label,
     icon,
     to,
}: {
     label: string;
     icon: React.ReactNode;
     to: string;
}) {
     const navigate = useNavigate();
     const location = useLocation();

     const isActive = location.pathname.startsWith(to);

     return (
          <button
               onClick={() => navigate(to)}
               className={`flex flex-col items-center text-sm ${isActive ? "text-customBlue" : "text-gray-600"
                    }`}
          >
               <div className={`text-lg ${isActive ? "text-customBlue" : ""}`}>
                    {icon}
               </div>
               <span>{label}</span>
          </button>
     );
}
