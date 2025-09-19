// pages/AddApplicationWeb.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Sidebar from "../../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";
import api from "../../../apis/api";
import { FaArrowLeft } from "react-icons/fa";
// import { api } from "../../utils/api"; // adjust path to your axios instance

type ApplicationFormValues = {
  job_title: string;
  company: string;
  status: string;
  applied_date: Date | null;
  job_link?: string;
  notes?: string;
  job_description?: string;
};

export default function AddApplicationWeb() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    defaultValues: {
      job_title: "",
      company: "",
      status: "",
      applied_date: null,
      job_link: "",
      notes: "",
      job_description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ApplicationFormValues) => {
      const payload = {
        job_title: data.job_title,
        company: data.company,
        status: data.status,
        applied_date: data.applied_date
          ? data.applied_date.toISOString()
          : null,
        job_link: data.job_link || null,
        notes: data.notes || null,
        job_description: data.job_description || null,
      };
      const res = await api.post("/applications/add-new-application", payload);
      return res.data;
    },
    onSuccess: (res) => {
      if (res?.application.status === "Interview") {
        navigate(`/applications/${res.application.id}/interview-details`);
      } else {
        navigate("/applications");
      }
    },
  });

  const onSubmit = (data: ApplicationFormValues) => {
    mutation.mutate(data);
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
              onClick={() => navigate("/my-profile")}
              className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
            >
              <img
              src={localStorage.getItem("profile_picture")??"/public/default_profile.png"}
                alt="user"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Main Form */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold mb-1">Add New Application</h1>
            <p className="text-gray-500 mb-6">
              Fill the details for your job application.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Job Title
                  </label>
                  <input
                    {...register("job_title", { required: "Job title is required" })}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  {errors.job_title && (
                    <p className="text-red-500 text-sm">{errors.job_title.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    {...register("company", { required: "Company is required" })}
                    placeholder="e.g. Acme Corp"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm">{errors.company.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    {...register("status", { required: "Status is required" })}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="">Select Application Status</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="not_applied">Not Applied</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm">{errors.status.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date Applied
                  </label>
                  <Controller
                    control={control}
                    name="applied_date"
                    rules={{ required: "Applied date is required" }}
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
                  {errors.applied_date && (
                    <p className="text-red-500 text-sm">
                      {errors.applied_date.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Job Link */}
              <div>
                <label className="block text-sm font-medium mb-1">Job Link</label>
                <input
                  {...register("job_link")}
                  placeholder="http://"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  {...register("notes")}
                  placeholder="Add any relevant notes about the application, e.g. Job location recruiter contact, interviewers, etc."
                  rows={3}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Description
                </label>
                <textarea
                  {...register("job_description")}
                  placeholder="Paste the job description here..."
                  rows={6}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

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
                  {mutation.isPending ? "Saving..." : "Save Application"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
