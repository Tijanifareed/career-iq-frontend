// // pages/InterviewDetailsWeb.tsx
// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import Sidebar from "../../../components/Sidebar";
// import { FaArrowLeft } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import api from "../../../apis/api";
// import TimeZoneDropdown from "../../../components/TimezoneDropdown";

// type InterviewFormValues = {
//      interview_date: Date | null;
//      timezone: string;
// };

// export default function InterviewDetailsWeb() {
//      const navigate = useNavigate();
//      const { id } = useParams<{ id: string }>();
//      if (!id) return <p className="p-6">Invalid application ID</p>;

//      const {
//           control,
//           handleSubmit,
//           setValue,
//           formState: { errors },
//      } = useForm<InterviewFormValues>({
//           defaultValues: {
//                interview_date: null,
//                timezone: "",
//           },
//      });

//      const mutation = useMutation({
//           mutationFn: async (formData: InterviewFormValues) => {
//                const payload = {
//                     // interview_date: formData.interview_date
//                     //      ? formData.interview_date.toISOString()
//                     //      : null,
//                     interview_date: formData.interview_date
//                          ? formData.interview_date.toLocaleString("sv-SE") // "2025-09-06 10:30:00"
//                          : null,

//                     timezone: formData.timezone,
//                };

//                const res = await api.post(
//                     `/applications/${id}/set-interview`,
//                     payload
//                );
//                return res.data;
//           },
//           onSuccess: () => {
//                navigate("/applications");
//           },
//      });

//      const onSubmit = (formData: InterviewFormValues) => {
//           mutation.mutate(formData);
//      };

//      return (
//           <div className="flex min-h-screen bg-gray-50 overflow-hidden">
//                <div className="absolute inset-0 bg-black/30 z-20 pointer-events-auto"></div>

//                {/* Sidebar */}
//                <div className="hidden md:block w-64 flex-shrink-0 fixed top-0 left-0 h-screen border-r bg-white">
//                     <Sidebar />
//                </div>

//                <div className="flex-1 flex flex-col md:pl-64 h-screen relative ">
//                     {/* Navbar */}
//                     <div className="sticky top-0 z-10 flex justify-between items-center px-4 md:px-6 py-2 bg-white border-b">
//                          {/* Back icon (mobile only) */}
//                          <button
//                               onClick={() => navigate(-1)}
//                               className="md:hidden text-gray-600 mr-2"
//                          >
//                               <FaArrowLeft size={18} />
//                          </button>

//                          <div className="flex-1 flex justify-end items-center">
//                               <button
//                                    onClick={() => navigate("/my-profile")}
//                                    className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
//                               >
//                                    <img
//                                         src="/path/to/avatar.jpg"
//                                         alt="user"
//                                         className="w-full h-full object-cover"
//                                    />
//                               </button>
//                          </div>
//                     </div>

//                     {/* Main Form */}
//                     <main className="flex-1 p-6 overflow-y-auto">
//                          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 relative z-40">
//                               <h1 className="text-2xl font-semibold mb-1">Interview Details</h1>
//                               <p className="text-gray-500 mb-6">
//                                    Add your interview schedule details.
//                               </p>

//                               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                                    {/* Interview Date */}
//                                    <div>
//                                         <label className="block text-sm font-medium mb-1">
//                                              Interview Date & Time
//                                         </label>

//                                         <Controller
//                                              control={control}
//                                              name="interview_date"
//                                              rules={{ required: "Interview date is required" }}
//                                              render={({ field }) => (
//                                                   <DatePicker
//                                                        className="w-full border rounded-md px-3 py-2"
//                                                        selected={field.value}
//                                                        onChange={(date) => {
//                                                             if (date) {
//                                                                  const fixedDate = new Date(
//                                                                       date.getFullYear(),
//                                                                       date.getMonth(),
//                                                                       date.getDate(),
//                                                                       date.getHours(),
//                                                                       date.getMinutes()
//                                                                  );
//                                                                  field.onChange(fixedDate);
//                                                             } else {
//                                                                  field.onChange(null);
//                                                             }
//                                                        }}
//                                                        placeholderText="Select date & time"
//                                                        showTimeSelect
//                                                        dateFormat="yyyy-MM-dd HH:mm"
//                                                   />
//                                              )}
//                                         />

//                                         {errors.interview_date && (
//                                              <p className="text-red-500 text-sm">
//                                                   {errors.interview_date.message}
//                                              </p>
//                                         )}
//                                    </div>

//                                    {/* Timezone Dropdown */}
//                                    <Controller
//                                         control={control}
//                                         name="timezone"
//                                         rules={{ required: "Timezone is required" }}
//                                         render={({ field }) => (
//                                              <TimeZoneDropdown
//                                                   label="Select Timezone"
//                                                   onChange={(val) => field.onChange(val)}
//                                              />
//                                         )}
//                                    />
//                                    {errors.timezone && (
//                                         <p className="text-red-500 text-sm">
//                                              {errors.timezone.message}
//                                         </p>
//                                    )}

//                                    <hr className="my-4" />

//                                    <div className="flex justify-end space-x-4">

//                                         <button
//                                              type="submit"
//                                              disabled={mutation.isPending}
//                                              className="px-4 py-2 bg-customBlue text-white rounded-md disabled:opacity-50"
//                                         >
//                                              {mutation.isPending ? "Saving..." : "Save Interview"}
//                                         </button>
//                                    </div>
//                               </form>
//                          </div>
//                     </main>
//                </div>
//           </div>
//      );
// }

// pages/InterviewDetailsWeb.tsx
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Sidebar from "../../../components/Sidebar";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../apis/api";
import TimeZoneDropdown from "../../../components/TimezoneDropdown";

type InterviewFormValues = {
     interview_date: Date | null;
     timezone: string;
};

export default function InterviewDetailsWeb() {
     const navigate = useNavigate();
     const { id } = useParams<{ id: string }>();
     if (!id) return <p className="p-6">Invalid application ID</p>;

     const {
          control,
          handleSubmit,
          formState: { errors },
     } = useForm<InterviewFormValues>({
          defaultValues: {
               interview_date: null,
               timezone: "",
          },
     });

     const mutation = useMutation({
          mutationFn: async (formData: InterviewFormValues) => {
               const payload = {
                    interview_date: formData.interview_date
                         ? formData.interview_date.toLocaleString("sv-SE") // ✅ send local time correctly
                         : null,
                    timezone: formData.timezone,
               };

               const res = await api.post(`/applications/${id}/set-interview`, payload);
               return res.data;
          },
          onSuccess: () => {
               navigate("/applications");
          },
     });

     const onSubmit = (formData: InterviewFormValues) => {
          mutation.mutate(formData);
     };

     // Detect mobile screen for portal behavior
     const [isMobile, setIsMobile] = useState<boolean>(() =>
          typeof window !== "undefined"
               ? window.matchMedia("(max-width:640px)").matches
               : false
     );
     useEffect(() => {
          const mq = window.matchMedia("(max-width:640px)");
          const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
          mq.addEventListener?.("change", handler);
          return () => mq.removeEventListener?.("change", handler);
     }, []);

     // Custom styled input for datepicker
     const CustomInput = React.forwardRef<HTMLButtonElement, any>(
          ({ value, onClick, placeholder }, ref) => {
               return (
                    <button
                         type="button"
                         onClick={onClick}
                         ref={ref}
                         className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-left hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-customBlue transition"
                    >
                         <div className="flex items-center space-x-3">
                              <FaCalendarAlt className="text-gray-500" />
                              <div className="text-sm">
                                   {value ? (
                                        <span className="text-gray-800">{value}</span>
                                   ) : (
                                        <span className="text-gray-400">{placeholder}</span>
                                   )}
                              </div>
                         </div>
                         <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden
                              className="text-gray-400"
                         >
                              <path
                                   d="M6 9l6 6 6-6"
                                   stroke="currentColor"
                                   strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                              />
                         </svg>
                    </button>
               );
          }
     );
     CustomInput.displayName = "CustomInput";

     return (
          <div className="flex min-h-screen bg-gray-50 overflow-hidden">
               <div className="absolute inset-0 bg-black/30 z-20 pointer-events-auto"></div>

               {/* Sidebar */}
               <div className="hidden md:block w-64 flex-shrink-0 fixed top-0 left-0 h-screen border-r bg-white">
                    <Sidebar />
               </div>

               <div className="flex-1 flex flex-col md:pl-64 h-screen relative">
                    {/* Navbar */}
                    <div className="sticky top-0 z-10 flex justify-between items-center px-4 md:px-6 py-2 bg-white border-b">
                         <button onClick={() => navigate(-1)} className="md:hidden text-gray-600 mr-2">
                              <FaArrowLeft size={18} />
                         </button>

                         <div className="flex-1 flex justify-end items-center">
                              <button
                                   onClick={() => navigate("/my-profile")}
                                   className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
                              >
                                   <img src="/path/to/avatar.jpg" alt="user" className="w-full h-full object-cover" />
                              </button>
                         </div>
                    </div>

                    {/* Main Form */}
                    <main className="flex-1 p-6 overflow-y-auto">
                         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 relative z-40 border border-gray-100">
                              <h1 className="text-2xl font-semibold mb-1">Interview Details</h1>
                              <p className="text-gray-500 mb-6">Add your interview schedule details.</p>

                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                   {/* Interview Date */}
                                   <div>
                                        <label className="block text-sm font-medium mb-1">Interview Date &amp; Time</label>

                                        <Controller
                                             control={control}
                                             name="interview_date"
                                             rules={{ required: "Interview date is required" }}
                                             render={({ field }) => (
                                                  <DatePicker
                                                       className="w-full border rounded-md px-3 py-2"
                                                       selected={field.value}
                                                       onChange={(date) => field.onChange(date ? new Date(date) : null)}
                                                       placeholderText="Select date & time"
                                                       showTimeSelect
                                                       timeIntervals={15}
                                                       timeCaption="Time"
                                                       dateFormat="yyyy-MM-dd HH:mm"
                                                       customInput={<CustomInput placeholder="Select date & time" />}
                                                       withPortal={isMobile}
                                                       {...(!isMobile && {
                                                            popperPlacement: "bottom-start",
                                                            popperProps: { strategy: "fixed" },
                                                       })}
                                                       popperProps={{ strategy: "fixed" }}
                                                       popperPlacement="bottom-start"
                                                  />
                                             )}
                                        />

                                        {errors.interview_date && (
                                             <p className="text-red-500 text-sm">{errors.interview_date.message}</p>
                                        )}
                                   </div>

                                   {/* Timezone Dropdown */}
                                   <Controller
                                        control={control}
                                        name="timezone"
                                        rules={{ required: "Timezone is required" }}
                                        render={({ field }) => (
                                             <TimeZoneDropdown
                                                  label="Select Timezone"
                                                  onChange={(val) => field.onChange(val)}
                                             />
                                        )}
                                   />
                                   {errors.timezone && (
                                        <p className="text-red-500 text-sm">{errors.timezone.message}</p>
                                   )}

                                   {errors.timezone && (
                                        <p className="text-red-500 text-sm">{errors.timezone.message}</p>
                                   )}

                                   <hr className="my-4" />

                                   <div className="flex justify-end space-x-4">
                                        <button
                                             type="submit"
                                             disabled={mutation.isPending}
                                             className="px-4 py-2 bg-customBlue text-white rounded-md disabled:opacity-50"
                                        >
                                             {mutation.isPending ? "Saving..." : "Save Interview"}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </main>
               </div>
          </div>
     );
}
