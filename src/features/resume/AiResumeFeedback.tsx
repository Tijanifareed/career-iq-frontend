import React, { useEffect, useState } from "react";
import AiResumeFeedbackWeb from "./AiResumeFeedbackWeb";


export default function AiResumeFeedbackPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <AiResumeFeedbackWeb /> : <AiResumeFeedbackWeb />;
}
