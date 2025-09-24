// src/pages/AiResumeFeedbackWeb.tsx
import React, { useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAnalyzeResume } from "../../queries/useAnalyzeResume";
import Ticker from "../../components/TickerComponent";
import { FaSearch, FaHome, FaFileAlt, FaRobot, FaPlus, FaUser } from "react-icons/fa";


type AnalyzeResponse = {
  filename?: string;
  extracted_text_preview?: string;
  analysis?: {
    ats_score?: number;
    keyword_match_score?: number;
    missing_keywords?: string[];
    suggestions?: string[];
  };
};

export default function AiResumeFeedbackWeb() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [showExtractPreview, setShowExtractPreview] = useState<boolean>(false);

  const analyzeResumeMutation = useAnalyzeResume();

  // Helpers
  const acceptedTypes = ".pdf,.docx";

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setSelectedFile(null);
      return;
    }
    const name = f.name.toLowerCase();
    if (!/\.(pdf|doc|docx)$/i.test(name)) {
      alert("Unsupported file type. Please upload a PDF or DOC/DOCX file.");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(f);
  }

  function openGoogleDrivePicker() {
    // TODO: implement Google Picker
    fileInputRef.current?.click();
  }

  function handleAnalyze() {
    if (!selectedFile) {
      alert("Please upload a resume (PDF/DOCX) before analyzing.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("job_description", jobDescription || "");

    analyzeResumeMutation.mutate(formData, {
      onSuccess: () => {
        setShowExtractPreview(true);
      },
    });
  }

  function handleReset() {
    setSelectedFile(null);
    setJobDescription("");
    setShowExtractPreview(false);
    analyzeResumeMutation.reset();
  }

  const result = analyzeResumeMutation.data as AnalyzeResponse | undefined;
  const loading = analyzeResumeMutation.isPending;
  const error = analyzeResumeMutation.failureReason as Error | null;


  const atsScore = result?.analysis?.ats_score ?? null;
  const keywordScore = result?.analysis?.keyword_match_score ?? null;
  const missingKeywords = result?.analysis?.missing_keywords ?? [];
  const suggestions = result?.analysis?.suggestions ?? [];

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 fixed top-0 left-0 h-screen border-r bg-white">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col md:pl-64 h-screen">
        {/* Navbar */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 md:px-6 py-2 bg-white border-b">
          {/* Left side placeholder (keeps spacing correct) */}
          <div />

          {/* Center text (only visible on mobile) */}
          <div className="block md:hidden text-sm font-medium text-gray-800">
            AI Resume Feedback
          </div>

          {/* Right side (avatar) */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/my-profile")}
              className="ml-4 w-9 h-9 rounded-full overflow-hidden border"
            >
              <img
              src={localStorage.getItem("profile_picture")??"/public/default_profile.png"}
                alt="user avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>



        <div className="bg-gray-50 border-b ">
          <Ticker />
        </div>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto pb-16">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="hidden md:block text-center">
              <h1 className="text-2xl font-semibold">AI Resume Feedback</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upload box */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Upload Resume</h3>
                    <div className="text-sm text-gray-500">
                      Accepted: PDF, DOCX
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-2">
                          Upload from your device or choose from Google Drive
                        </div>
                        <div className="flex items-center gap-3">
                          <label
                            htmlFor="resume-upload"
                            className="inline-flex items-center px-4 py-2 border rounded-md cursor-pointer"
                          >
                            <input
                              id="resume-upload"
                              ref={fileInputRef}
                              type="file"
                              accept={acceptedTypes}
                              onChange={onFileChange}
                              className="hidden"
                            />
                            <span className="text-sm">Choose file</span>
                          </label>

                          {/* <button
                            type="button"
                            onClick={openGoogleDrivePicker}
                            className="px-4 py-2 border rounded-md text-sm"
                          >
                            Import from Google Drive
                          </button> */}

                          <div className="text-sm text-gray-500">
                            {selectedFile ? (
                              <span className="font-medium">
                                {selectedFile.name}
                              </span>
                            ) : (
                              <span>No file selected</span>
                            )}
                          </div>
                        </div>

                        {/* Extracted preview */}
                        {result?.extracted_text_preview && (
                          <div className="mt-4">
                            <button
                              onClick={() =>
                                setShowExtractPreview((s) => !s)
                              }
                              className="text-sm text-blue-600 underline"
                            >
                              {showExtractPreview ? "Hide" : "Show"} resume preview
                            </button>
                            {showExtractPreview && (
                              <pre className="mt-2 p-3 bg-gray-50 border rounded text-sm whitespace-pre-wrap max-h-40 overflow-auto">
                                {result.extracted_text_preview}
                              </pre>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium mb-2">Job Description</h3>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={6}
                    placeholder="Paste the job description here..."
                    className="w-full border rounded-md px-3 py-2 focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    AI will analyze your resume against this description.
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="px-4 py-2 bg-customBlue text-white rounded-md disabled:opacity-50"
                    >
                      {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 border rounded-md"
                    >
                      Reset
                    </button>

                    {error && (
                      <div className="text-red-500 text-sm">
                        {error.message || "Failed to analyze resume."}
                      </div>
                    )}
                  </div>
                </div>

                {/* Analysis summary */}
                {result && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-2">Analysis Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Filename</div>
                        <div className="font-medium">
                          {result.filename ?? "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">ATS Score</div>
                        <div className="font-medium">
                          {atsScore !== null ? `${atsScore}%` : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="text-sm text-blue-600 underline"
                      >
                        View full analysis on the right
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <aside className="space-y-6 w-full">
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium mb-2">ATS Score</h4>
                  <div className="text-3xl font-semibold text-customBlue">
                    {atsScore !== null ? `${atsScore}%` : "--"}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    How well your resume ranks with Applicant Tracking Systems.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium mb-2">Keyword Match</h4>
                  <div className="text-3xl font-semibold text-green-600">
                    {keywordScore !== null ? `${keywordScore}%` : "--"}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Percentage of job description keywords found in your resume.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium mb-3">Missing Keywords</h4>
                  {missingKeywords.length ? (
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-gray-200 text-sm"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No missing keywords found.
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-md font-medium mb-3">Suggestions</h4>
                  {suggestions.length ? (
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      {suggestions.map((sugg, idx) => (
                        <li key={idx} className="text-gray-700">
                          {sugg}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No suggestions yet.
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 md:hidden z-20">
        <NavItem label="Dashboard" icon={<FaHome />} to="/dashboard" location={location} />
        <NavItem label="Applications" icon={<FaFileAlt />} to="/applications" location={location} />
        <NavItem label="Resume AI" icon={<FaRobot />} to="/ai/resume/feedback" location={location} />
        <NavItem label="Profile" icon={<FaUser />} to="/my-profile" location={location}/>
      </div>
    </div>
  );
}



function NavItem({
  label,
  icon,
  to,
  location,
}: {
  label: string;
  icon: React.ReactNode;
  to: string;
  location: any;
}) {
  const navigate = useNavigate();
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
