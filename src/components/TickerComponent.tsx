

// src/components/TickerComponent.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../apis/api";

const motivationalQuotes = [
  "Stay positive, work hard, make it happen 💪",
  "Your dream job is closer than you think 🚀",
  "Every rejection is redirection 🔄",
  "Consistency beats intensity 🌱",
  "Believe in yourself — recruiters can tell 🌟",
  "One application today could change everything ✨",
  "Skills + persistence = job offer 🔑",
  "Don’t wait for opportunity, create it ⚡",
  "Every interview is practice for the big one 🎯",
  "Your value isn’t defined by rejections 💼",
  "Keep applying, keep growing 🌍",
  "Small progress every day adds up 📈",
  "Courage is showing up, even when it’s tough 💥",
  "Someone is hiring for your exact skills 🧩",
  "Your future self will thank you for not quitting 🙌",
  "Dreams don’t work unless you do 🔨",
  "Keep learning, keep earning 📚",
  "Today’s effort is tomorrow’s success 🌞",
  "The best opportunities come when you least expect them 🎁",
  "Believe: the right company is looking for YOU 🔍",
];

const PIXELS_PER_SECOND = 80; // adjust speed globally (higher => faster)

const Ticker: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // animKey forces a re-mount of the animated element so animation restarts
  const [animKey, setAnimKey] = useState(0);

  // measured values
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Fetch interview message / fallback to quotes

useEffect(() => {
  let mounted = true;

  const fetchMessage = async () => {
    const now = Date.now();
    const TWO_MINUTES = 2 * 60 * 1000;

    const lastFetch = parseInt(localStorage.getItem("lastInterviewFetch") || "0", 10);
    const cachedMessage = localStorage.getItem("lastInterviewMessage");

    // ✅ If still fresh (whether interview or fallback), use cached
    if (now - lastFetch < TWO_MINUTES) {
      console.log("Using cached:", cachedMessage || "fallback quotes");
      if (mounted) {
        setMessages(cachedMessage ? [cachedMessage] : shuffle(motivationalQuotes));
        setCurrentIndex(0);
        setAnimKey((k) => k + 1);
      }
      return;
    }

    // ✅ Otherwise call API
    try {
      const res = await api.get("/applications/upcoming-interview");
      if (!mounted) return;

      if (res.data?.message) {
        const msg = res.data.message;
        setMessages([msg]);
        setCurrentIndex(0);
        setAnimKey((k) => k + 1);

        // save to cache
        localStorage.setItem("lastInterviewMessage", msg);
        localStorage.setItem("lastInterviewFetch", String(now));
      } else {
        // mark fetch time even if no interview
        localStorage.removeItem("lastInterviewMessage");
        localStorage.setItem("lastInterviewFetch", String(now));

        // fallback
        setMessages(shuffle(motivationalQuotes));
        setCurrentIndex(0);
        setAnimKey((k) => k + 1);
      }
    } catch (err) {
      console.error("Failed to fetch interview:", err);
      if (!mounted) return;

      // fallback to cache first, then quotes
      if (cachedMessage) {
        setMessages([cachedMessage]);
      } else {
        setMessages(shuffle(motivationalQuotes));
      }
      setCurrentIndex(0);
      setAnimKey((k) => k + 1);

      // still update timestamp so we don’t hammer the server
      localStorage.setItem("lastInterviewFetch", String(now));
    }
  };

  fetchMessage();

  return () => {
    mounted = false;
  };
}, []);





  // Measure widths and update CSS vars BEFORE paint for smooth animation
  useLayoutEffect(() => {
    const cont = containerRef.current;
    const txt = textRef.current;
    if (!cont || !txt) return;

    const measureAndApply = () => {
      const containerWidth = cont.clientWidth || cont.offsetWidth || 0;
      const textWidth = txt.scrollWidth || txt.offsetWidth || 0;

      // total distance the text needs to travel (enter from right, leave left)
      const distance = containerWidth + textWidth;

      // compute duration based on px/sec
      const duration = Math.max(2, distance / PIXELS_PER_SECOND); // min 2s guard

      // set CSS variables on the text element
      txt.style.setProperty("--ticker-start", `${containerWidth}px`);
      txt.style.setProperty("--ticker-end", `-${textWidth}px`);
      txt.style.setProperty("--ticker-duration", `${duration}s`);

      // ensure hardware acceleration hint
      txt.style.willChange = "transform";

      // Force reflow (so new CSS vars are picked up)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      txt.offsetWidth;
    };

    // measure on next frame to ensure layout is ready
    requestAnimationFrame(measureAndApply);

    // also recalc on window resize
    const onResize = () => {
      requestAnimationFrame(measureAndApply);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [messages, currentIndex, animKey]);

  // on end: advance index & bump animKey (forces re-mount even if same index)
  const handleAnimationEnd = () => {
    setCurrentIndex((prev) => (messages.length ? (prev + 1) % messages.length : 0));
    setAnimKey((k) => k + 1);
  };

  if (!messages || messages.length === 0) return null;

  // current message to render
  const current = messages[currentIndex];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[640px] md:max-w-[760px] overflow-hidden whitespace-nowrap"
      aria-live="polite"
      role="status"
    >
      {/* key forces remount so animation restarts; animKey increments every cycle */}
      <div 
        key={`${currentIndex}-${animKey}`}
        ref={textRef}
        className="inline-block text-sm md:text-base leading-none font-inter italic"
        onAnimationEnd={handleAnimationEnd}
        style={{
          // Use CSS variables for start/end/duration, used inside keyframes below
          animation: "ticker-scroll var(--ticker-duration) linear",
          // keep text on single line and ensure smooth GPU acceleration
          transform: "translate3d(var(--ticker-start),0,0)",
        }}
      >
        {current}
      </div>

      {/* Scoped keyframes that use CSS variables set on the element */}
      <style>{`
        @keyframes ticker-scroll {
          from {
            transform: translate3d(var(--ticker-start), 0, 0);
          }
          to {
            transform: translate3d(var(--ticker-end), 0, 0);
          }
        }

        /* optional small visual tweaks */
        .inline-block { white-space: nowrap; }
      `}</style>
    </div>
  );
};

export default Ticker;

// helper
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
