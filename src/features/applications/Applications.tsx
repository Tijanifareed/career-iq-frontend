import React, { useEffect, useState } from "react";
import ApplicationsWeb from "./ApplicationsWeb";
import ApplicationsMobile from "./ApplicationsMobile";

export default function ApplicationsPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <ApplicationsMobile /> : <ApplicationsWeb />;
}
