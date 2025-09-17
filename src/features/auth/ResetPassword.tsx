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
import { loginUser, resetPassword } from "../../apis/authService";
import FeedbackModal from "../../components/FeedbackModal";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  var user_email = localStorage.getItem("user_email") || "No email found";



  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmPassword != password) return;

    setLoading(true);
    // console.log("FORM SUBMITTED ✅");
    // console.log({ email, password });



    try {
      const data = await resetPassword(user_email, password);
      // console.log("Login successful:", data);


      setModalType("success");
      setModalMessage(data.message || "Password Changed Successfully");

      setNextRoute("/login");
     
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Operation failed try again later";
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
          Change Password
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm font-inter" >
          Enter your new password.
        </p>
        <form onSubmit={handleSubmit} >
          <PasswordInputField
            label=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showForgotPassword={false}
            placeholder="Enter new password"
          />

          <PasswordInputField
            label=""
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            showForgotPassword={false}
            forgotPasswordUrl="/forgot-password"
            placeholder="Confirm new password"
          />

          <Button type="submit" loading={loading}>
            {loading ? "Signing up..." : "Done"}
          </Button>
        </form>
        
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
