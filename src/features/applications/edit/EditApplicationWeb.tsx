// pages/EditApplicationWeb.tsx
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../../apis/api";

import "react-datepicker/dist/react-datepicker.css";
import SearchableTimeZoneDropdown from "../../../components/SearchableTimeZoneDropdown";

type ApplicationFormValues = {
     job_title?: string;
     company?: string;
     status?: string;
     applied_date?: Date | null;
     job_link?: string | null;
     notes?: string | null;
     job_description?: string | null;
     interview_date?: Date | null;
     interview_timezone?: string | null;
     follow_up_date?: Date | null;
};

export default function EditApplicationWeb() {
     const navigate = useNavigate();
     const { id } = useParams<{ id: string }>();
     const [showDatePicker, setShowDatePicker] = useState(false);

     if (!id) return <p className="p-6">Invalid application ID</p>;
     // <-- add this


     const {
          register,
          handleSubmit,
          control,
          reset,
          watch,
          formState: { errors, dirtyFields },
     } = useForm<ApplicationFormValues>();

     const formValues = watch();
     const { state } = useLocation();
     const application = state?.application;

     useEffect(() => {
          if (application) {
               reset({
                    job_title: application.job_title,
                    company: application.company,
                    status: application.status,
                    applied_date: application.applied_date ? new Date(application.applied_date) : null,
                    job_link: application.job_link,
                    notes: application.notes,
                    job_description: application.job_description,
                    interview_date: application.interview_date ? new Date(application.interview_date) : null,
                    interview_timezone: application.interview_timezone,
                    follow_up_date: application.follow_up_date ? new Date(application.follow_up_date) : null,
               });
          }
     }, [application, reset]);

     if (!application) return <p className="p-6">No application found</p>;
     // console.log(application);

     const mutation = useMutation({
          mutationFn: async (formData: ApplicationFormValues) => {
               const payload: Record<string, any> = {};

               Object.keys(dirtyFields).forEach((field) => {
                    const val = (formData as any)[field];
                    if (val instanceof Date) {
                         payload[field] = val.toLocaleString("sv-SE"); // keep local time
                    } else {
                         payload[field] = val ?? null;
                    }
               });

               // ✅ Ensure interview_timezone also respects dirtyFields
               console.log(formData.interview_timezone)
               if (dirtyFields.interview_timezone) {
                    payload["interview_timezone"] = formData.interview_timezone;
               }

               const res = await api.patch(`/applications/my-applications/${id}`, payload);
               return res.data;
          },
          onSuccess: (res) => {
               if (
                    res?.application.status === "Interview" &&
                    res.application.interview_date == null &&
                    res.application.interview_timezone == null
               ) {
                    navigate(`/applications/${id}/interview-details`);
               } else {
                    navigate("/applications");
               }
          },
     });



     const onSubmit = (formData: ApplicationFormValues) => {
          mutation.mutate(formData);
     };


     return (
          <div className="flex min-h-screen bg-gray-50 overflow-hidden">
               {/* Sidebar */}
               <div className="hidden md:block w-64 flex-shrink-0 fixed top-0 left-0 h-screen border-r bg-white">
                    <Sidebar />
               </div>

               <div className="flex-1 flex flex-col md:pl-64 h-screen">
                    {/* Navbar */}
                    <div className="sticky top-0 z-10 flex justify-between items-center px-4 md:px-6 py-2 bg-white border-b">
                         {/* Back icon (mobile only) */}
                         <button
                              onClick={() => navigate(-1)}
                              className="md:hidden text-gray-600 mr-2"
                         >
                              <FaArrowLeft size={18} />
                         </button>

                         <div className="flex-1 flex justify-end items-center">
                              <button
                                   onClick={() => navigate("/profile")}
                                   className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
                              >
                                   <img
                                        src="/path/to/avatar.jpg"
                                        alt="user"
                                        className="w-full h-full object-cover"
                                   />
                              </button>
                         </div>
                    </div>

                    {/* Main Form */}
                    <main className="flex-1 p-6 overflow-y-auto">
                         <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
                              <h1 className="text-2xl font-semibold mb-1">Edit Application</h1>
                              <p className="text-gray-500 mb-6">
                                   Update details for your job application.
                              </p>

                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                   {/* Row 1 */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                             <label className="block text-sm font-medium mb-1">
                                                  Job Title
                                             </label>
                                             <input
                                                  {...register("job_title", {
                                                       required: "Job title is required",
                                                  })}
                                                  className="w-full border rounded-md px-3 py-2"
                                             />
                                             {errors.job_title && (
                                                  <p className="text-red-500 text-sm">
                                                       {errors.job_title.message}
                                                  </p>
                                             )}
                                        </div>
                                        <div>
                                             <label className="block text-sm font-medium mb-1">
                                                  Company
                                             </label>
                                             <input
                                                  {...register("company", { required: "Company is required" })}
                                                  className="w-full border rounded-md px-3 py-2"
                                             />
                                             {errors.company && (
                                                  <p className="text-red-500 text-sm">
                                                       {errors.company.message}
                                                  </p>
                                             )}
                                        </div>
                                   </div>

                                   {/* Row 2 */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Status</label>

                                             {/* <Controller
                                                  control={control}
                                                  name="status"
                                                  rules={{ required: "Status is required" }}
                                                  render={({ field }) => (
                                                       <select {...field} className="w-full border rounded-md px-3 py-2">
                                                            <option value="">Select Status</option>
                                                            <option value="applied">Applied</option>
                                                            <option value="interview">Interview</option>
                                                            <option value="offer">Offer</option>
                                                            <option value="rejected">Rejected</option>
                                                            <option value="not_Applied">Not Applied</option>
                                                       </select>
                                                  )}
                                             /> */}
                                             <Controller
                                                  control={control}
                                                  name="status"
                                                  rules={{ required: "Status is required" }}
                                                  render={({ field }) => (
                                                       <select
                                                            {...field}
                                                            className="w-full border rounded-md px-3 py-2"
                                                            value={field.value || application.status || ""} // use current status as fallback
                                                       >
                                                            {/* Show current status dynamically instead of static "Select Status" */}
                                                            <option value={application.status || ""}>
                                                                 {application.status
                                                                      ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
                                                                      : "Select Status"}
                                                            </option>

                                                            <option value="applied">Applied</option>
                                                            <option value="interview">Interview</option>
                                                            <option value="offer">Offer</option>
                                                            <option value="rejected">Rejected</option>
                                                            <option value="not_Applied">Not Applied</option>
                                                       </select>
                                                  )}
                                             />



                                        </div>
                                        <div>
                                             <label className="block text-sm font-medium mb-1">
                                                  Date Applied
                                             </label>
                                             <Controller
                                                  control={control}
                                                  name="applied_date"
                                                  render={({ field }) => (
                                                       <DatePicker
                                                            className="w-full border rounded-md px-3 py-2"
                                                            selected={field.value}
                                                            onChange={(date) => field.onChange(date)}
                                                            placeholderText="Select date"
                                                            dateFormat="yyyy-MM-dd"
                                                       />
                                                  )}
                                             />
                                        </div>
                                   </div>

                                   {/* Conditionally render extra fields */}
                                   {/* {data?.job_link && ( */}
                                   <div>
                                        <label className="block text-sm font-medium mb-1">
                                             Job Link
                                        </label>
                                        <input
                                             {...register("job_link")}
                                             className="w-full border rounded-md px-3 py-2"
                                        />
                                   </div>
                                   {/* )} */}

                                   {/* {data?.notes && ( */}
                                   <div>
                                        <label className="block text-sm font-medium mb-1">Notes</label>
                                        <textarea
                                             {...register("notes")}
                                             rows={3}
                                             className="w-full border rounded-md px-3 py-2"
                                        />
                                   </div>
                                   {/* )} */}

                                   {/* {data?.job_description && ( */}
                                   <div>
                                        <label className="block text-sm font-medium mb-1">
                                             Job Description
                                        </label>
                                        <textarea
                                             {...register("job_description")}
                                             rows={6}
                                             className="w-full border rounded-md px-3 py-2"
                                        />
                                   </div>
                                   {/* )} */}

                                   {/* {application?.interview_date && (
                                        <div>
                                             <label className="block text-sm font-medium mb-1">
                                                  Interview Date
                                             </label>
                                             <Controller
                                                  control={control}
                                                  name="interview_date"
                                                  render={({ field }) => (
                                                       <DatePicker
                                                            className="w-full border rounded-md px-3 py-2"
                                                            selected={field.value}
                                                            onChange={(date) => field.onChange(date)}
                                                            placeholderText="Select date"
                                                            showTimeSelect
                                                            dateFormat="yyyy-MM-dd HH:mm"
                                                       />
                                                  )}
                                             />
                                        </div>
                                   )} */}
                                   {application?.interview_date && (
                                        <div>
                                             <label className="block text-sm font-medium mb-1">
                                                  Interview Date
                                             </label>

                                             {/* Toggle view/edit state */}
                                             <div className="flex items-center justify-between">
                                                  {!showDatePicker ? (
                                                       <div className="flex-1 flex items-center justify-between border rounded-md px-3 py-2 bg-gray-50">
                                                            <span className="text-gray-700 text-sm">
                                                                 {formValues.interview_date
                                                                      ? new Date(formValues.interview_date).toLocaleString("en-US", {
                                                                           year: "numeric",
                                                                           month: "short",
                                                                           day: "numeric",
                                                                           hour: "2-digit",
                                                                           minute: "2-digit",
                                                                      })
                                                                      : "Not set"}
                                                            </span>
                                                            <button
                                                                 type="button"
                                                                 onClick={() => setShowDatePicker(true)}
                                                                 className="ml-3 text-sm text-blue-600 hover:underline"
                                                            >
                                                                 Change
                                                            </button>
                                                       </div>
                                                  ) : (

                                                       <Controller
                                                            control={control}
                                                            name="interview_date"
                                                            render={({ field }) => (
                                                                 <DatePicker
                                                                      className="w-full border rounded-md px-3 py-2"
                                                                      selected={field.value}
                                                                      onChange={(date) => field.onChange(date)}
                                                                      placeholderText="Select date & time"
                                                                      showTimeSelect
                                                                      timeIntervals={30}   // optional: controls minutes step
                                                                      dateFormat="yyyy-MM-dd HH:mm"
                                                                      // 👇 This keeps it from auto-shifting to UTC
                                                                      timeCaption="Time"
                                                                 />
                                                            )}
                                                       />



                                                  )}
                                             </div>
                                        </div>
                                   )}

                                   {application?.interview_timezone && (
                                        <div>
                                             {/* <Controller
                                                  control={control}
                                                  name="interview_timezone"
                                                  render={({ field }) => (
                                                       <SearchableTimeZoneDropdown
                                                            label="Interview Timezone"
                                                            value={field.value || ""}
                                                            onChange={(val) => field.onChange(val)}
                                                       />
                                                  )}
                                             /> */}
                                             <Controller
                                                  control={control}
                                                  name="interview_timezone"
                                                  render={({ field }) => (
                                                       <SearchableTimeZoneDropdown
                                                            label="Interview Timezone"
                                                            value={field.value || ""}
                                                            onChange={(val) => {
                                                                 field.onChange(val); // ✅ updates form value
                                                                 field.onBlur();      // ✅ marks as touched
                                                            }}
                                                       />
                                                  )}
                                             />

                                        </div>
                                   )}


                                   {application?.follow_up_date && (
                                        <div>
                                             <label className="block text-sm font-medium mb-1">
                                                  Follow-up Date
                                             </label>
                                             <Controller
                                                  control={control}
                                                  name="follow_up_date"
                                                  render={({ field }) => (
                                                       <DatePicker
                                                            className="w-full border rounded-md px-3 py-2"
                                                            selected={field.value}
                                                            onChange={(date) => field.onChange(date)}
                                                            placeholderText="Select date"
                                                            dateFormat="yyyy-MM-dd"
                                                       />
                                                  )}
                                             />
                                        </div>
                                   )}

                                   {/* Divider */}
                                   <hr className="my-4" />

                                   {/* Actions */}
                                   <div className="flex justify-end space-x-4">
                                        <button
                                             type="button"
                                             onClick={() => navigate("/applications")}
                                             className="px-4 py-2 border rounded-md"
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             type="submit"
                                             disabled={mutation.isPending}
                                             className="px-4 py-2 bg-customBlue text-white rounded-md disabled:opacity-50"
                                        >
                                             {mutation.isPending ? "Saving..." : "Update Application"}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </main>
               </div>
          </div>
     );
}
