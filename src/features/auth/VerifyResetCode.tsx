import { useState } from "react";
import Button from "../../components/Button";
import FormWrapper from "../../components/FormWrapper";
import InputField from "../../components/InputField";
import { forgetPassword, verifyResetCode } from "../../apis/authService";
import FeedbackModal from "../../components/FeedbackModal";
import { useNavigate } from "react-router-dom";
import AuthFooter from "../../components/AuthFooter";

export default function VerifyResetCode() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [nextRoute, setNextRoute] = useState<string | null>(null);
var user_email = localStorage.getItem("user_email") || "No email found";


  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const data = await verifyResetCode(token,user_email);

      setModalType("success");
      setModalMessage(data.message || "Verified");

      if (data.message == "Reset code verified successfully. You can now reset your password."){
        setNextRoute("/verify-code");
      }
    } catch (err: any) {
      const message =
        "Invalid code try again later";
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
          Verify Code
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm font-inter" >
          Enter the code sent to {user_email}.
        </p>
        
        <form onSubmit={handleSubmit} >
         
          <InputField
            label=""
            type="normal"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter six digit code"
             
          />


          <Button type="submit" loading={loading}>
            {loading ? "Sending..." : "Verify"}
          </Button>
          <AuthFooter
          promptText="Didn't recieve code?"
          actionText="Resend Code"
          actionLink="/forgot-password"
        />
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
