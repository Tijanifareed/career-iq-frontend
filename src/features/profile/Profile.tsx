import React, { useEffect, useState } from "react";
import ProfileWeb from "./ProfileWeb";
import ProfileMobile from "./ProfileMobile";


export default function ProfilePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <ProfileMobile /> : <ProfileWeb />;
}
