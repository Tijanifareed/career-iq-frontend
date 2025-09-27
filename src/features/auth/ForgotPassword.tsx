import { useState } from "react";
import Button from "../../components/Button";
import FormWrapper from "../../components/FormWrapper";
import InputField from "../../components/InputField";
import { forgetPassword } from "../../apis/authService";
import FeedbackModal from "../../components/FeedbackModal";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [nextRoute, setNextRoute] = useState<string | null>(null);


  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const data = await forgetPassword(email);

      setModalType("success");
      setModalMessage(data.message || "Code sent successfully check your mail");
      localStorage.setItem("user_email", email)
      setNextRoute("/verify-code");
    } catch (err: any) {
      const message =
        "Not successfull check your E-mail address or try again later";
      setModalType("error");
      setModalMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalMessage(null);
    if (modalType === "success" && nextRoute) {
      navigate(nextRoute,{
        state: {userEmail: email}
      });
    }
  };

  

  return (
    <div>
      <FormWrapper title="HireJourney" logoSrc="/logo.png">
        <h2 className="text-2xl font-bold font-inter text-black text-center mb-1">
          Forgot Your Password?
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm font-inter" >
          Enter the email address associated with your account, and we'll send you a token to reset your password.
        </p>
        
        <form onSubmit={handleSubmit} >
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />


          <Button type="submit" loading={loading}>
            {loading ? "Sending..." : "Send reset code"}
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
