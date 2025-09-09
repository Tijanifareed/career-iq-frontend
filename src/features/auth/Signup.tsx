import FormWrapper from "../../components/FormWrapper";
import TabSwitcher from "../../components/TabSwitcher";
import InputField from "../../components/InputField";
import { useState } from "react";
import PasswordInputField from "../../components/PasswordInputField";
import Button from "../../components/Button";
import AuthFooter from "../../components/AuthFooter";
import TermsAndPrivacy from "../../components/TermsAndPrivacy";
import DividerWithText from "../../components/DividerWithText";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { signupUser } from "../../apis/authService";
import FeedbackModal from "../../components/FeedbackModal";
import { useNavigate } from "react-router-dom";



export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const navigate = useNavigate();
  var timezone = "";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("FORM SUBMITTED ✅");
    console.log({ email, password, username });
    if (!email || !password || !username) {
      setLoading(false);
     return;
    }

    try {
      const data = await signupUser({ username, email, password });
      console.log("Signup successful:", data);
      setModalType("success");
      console.log(data.data.timezone)
      timezone = data.data.timezone
      setModalMessage(data.message || "Account created successfully");
      // Redirect to login or dashboard
    } catch (err: any) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Signup failed";
      setModalType("error");
      setModalMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalMessage(null);
    if (timezone === null) {
      navigate("/timezone"); 
  };
}


  return (
    <div>
      <FormWrapper title="HireJourney" logoSrc="/logo.png">
        <h2 className="text-2xl font-bold font-inter text-black text-center mb-1">
          Welcome to HireJourney
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm font-inter" >
          Create Your Account.
        </p>
        <TabSwitcher activeTab="Sign Up" />
        <form onSubmit={handleSubmit} >
          <InputField
            label="Name"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
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
            showForgotPassword={false}   // ✅ hides the link
          />
          {/* <Button type="submit">SignUp</Button> */}
          <Button type="submit" loading={loading}>
            {/* SignUp */}
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <DividerWithText text="Or" />
        <GoogleSignInButton onClick={() => console.log("Google Sign-In clicked")} />

        <AuthFooter
          promptText="Have an account?"
          actionText="Sign in"
          actionLink="/login"
        />
        <TermsAndPrivacy className="mt-3" />
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
