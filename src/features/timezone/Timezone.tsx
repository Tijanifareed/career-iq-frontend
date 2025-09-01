import React, { useState } from 'react'
import CenterFormWrapper from '../../components/CenterFormWrapper'
import TimezoneDropdown from '../../components/TimezoneDropdown';
import Button from '../../components/Button';
import { saveUserTimezone } from '../../apis/userService';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '../../components/FeedbackModal';


export default function Timezone() {
const [selectedTimezone, setSelectedTimezone] = useState<string>("");
const [loading, setLoading] = useState(false);
const [modalMessage, setModalMessage] = useState<string | null>(null);
const [modalType, setModalType] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  const handleTimezoneChange = (abbr: string) => {
    console.log("Selected timezone:", abbr);
    setSelectedTimezone(abbr);
  };

  const handleContinue = async () => {
    if (!selectedTimezone) return;
    setLoading(true);

    try {
      const data = await saveUserTimezone(selectedTimezone);
      console.log("Timezone saved:", data);
      setModalType("success");
      setModalMessage(data.message || "Timezone saved successfully");
    } catch (err: any) {
      console.error("Failed to save timezone:", err);
      const message = err.response?.data?.detail || err.message || "Failed to save timezone";
      setModalType("error");
      setModalMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalMessage(null);
    if (modalType === "success") {
      navigate("/dashboard");
    }
  };




  return (
    <div>
      <CenterFormWrapper title="CareerIQ" logoSrc="/public/logo.png">
          <h2 className="text-xl font-bold font-inter text-black text-center mb-1">
          Set Your Time Zone
        </h2>
        <p className="text-center text-gray-500 text-sm mb-4 italic">
          This time zone will be used to convert interview times to your local time.
        </p>
        <TimezoneDropdown onChange={handleTimezoneChange} />
        <Button
          type="button"
          onClick={handleContinue}
          loading={loading}
          disabled={!selectedTimezone}
          className="mt-4"
        >
           Continue
        </Button>
      </CenterFormWrapper>
      {modalMessage && (
        <FeedbackModal
          type={modalType}
          message={modalMessage}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}

