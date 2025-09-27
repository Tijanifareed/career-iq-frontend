import { useState } from "react";
import Button from "../../components/Button";
import FormWrapper from "../../components/FormWrapper";
import InputField from "../../components/InputField";
import TabSwitcher from "../../components/TabSwitcher";
import PasswordInputField from "../../components/PasswordInputField";
import AuthFooter from "../../components/AuthFooter";
import TermsAndPrivacy from "../../components/TermsAndPrivacy";
import DividerWithText from "../../components/DividerWithText";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { loginUser } from "../../apis/authService";
import FeedbackModal from "../../components/FeedbackModal";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [nextRoute, setNextRoute] = useState<string | null>(null);


  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    // console.log("FORM SUBMITTED ✅");
    // console.log({ email, password });



    try {
      const data = await loginUser(email, password);
      // console.log("Login successful:", data);


      setModalType("success");
      setModalMessage(data.message || "Account login successfully");

      const route = data.data?.timezone ? "/dashboard" : "/timezone";
      setNextRoute(route);
      if (data.access_token && data.refresh_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("profile_picture", data.data.profile_picture);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login Failed";
      setModalType("error");
      setModalMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalMessage(null);
    if (modalType === "success" && nextRoute) {
      navigate(nextRoute);
    }
  };

  return (
    <div>
      <FormWrapper title="HireJourney" logoSrc="/logo.png">
        <h2 className="text-2xl font-bold font-inter text-black text-center mb-1">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm font-inter" >
          Enter your credentials to access your account.
        </p>
        <TabSwitcher activeTab="Login" />
        <form onSubmit={handleSubmit} >
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <PasswordInputField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showForgotPassword={true}
            forgotPasswordUrl="/forgot-password"
          />

          <Button type="submit" loading={loading}>
            {loading ? "Signing up..." : "Login"}
          </Button>
        </form>
        <DividerWithText text="Or" />
        {/* <GoogleSignInButton onClick={() => console.log("Google Sign-In clicked")} /> */}
        <AuthFooter
          promptText="Don't have an account?"
          actionText="Sign Up"
          actionLink="/signup"
        />
        <TermsAndPrivacy
          className="mt-3"
        />
      </FormWrapper>
      {modalMessage && (
        <FeedbackModal
          type={modalType}
          message={modalMessage}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
