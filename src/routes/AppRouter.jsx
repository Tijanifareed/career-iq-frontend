import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../features/auth/Signup"; // can leave placeholder for now
import DashboardPage from "../features/dashboard/Dashboard"; // placeholder
import Login from "../features/auth/Login";
import Timezone from "../features/timezone/Timezone"; 
import ApplicationsPage from "../features/applications/Applications"
import AddApplicationPage from "../features/applications/add/AddApplication"
import ApplicationDetailsWeb from "../features/applications/detail/ApplicationDetailsWeb"
import EditApplicationWeb from "../features/applications/edit/EditApplicationWeb"
import InterviewDetailsWeb from "../features/applications/interview/InterviewDetailWeb"
import LandingPage from "../features/landing/LandingPage"
import AboutPage from "../features/landing/AboutPage"
import PrivacyPolicy from "../features/landing/PrivacyPolicy"
import TermsOfService from "../features/landing/TermsOfService"
import AiResumeFeedbackPage from "../features/resume/AiResumeFeedback"
import ForgotPassword from "../features/auth/ForgotPassword"
import VerifyResetCode from "../features/auth/VerifyResetCode"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/timezone" element={<Timezone />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/applications/new" element={<AddApplicationPage />}/>
        <Route path="/applications/:id" element={<ApplicationDetailsWeb />} />
        <Route path="/applications/:id/edit" element={<EditApplicationWeb />} />
        <Route path="/applications/:id/interview-details" element={< InterviewDetailsWeb/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/ai/resume/feedback" element={<AiResumeFeedbackPage/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-code" element={<VerifyResetCode/>}/>








      </Routes>
    </BrowserRouter>
  );
}

