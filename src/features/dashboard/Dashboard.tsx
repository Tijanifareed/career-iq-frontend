import React, { useEffect, useState } from "react";
import DashboardWeb from "./DashboardWeb";
import DashboardMobile from "./DashboardMobile";

export default function DashboardPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <DashboardMobile /> : <DashboardWeb />;
}
