// import React, { useEffect, useState } from "react";
// import api from "../apis/api";

// const motivationalQuotes = [
//   "Stay positive, work hard, make it happen 💪",
//   "Your dream job is closer than you think 🚀",
//   "Every rejection is redirection 🔄",
//   "Consistency beats intensity 🌱",
//   "Believe in yourself — recruiters can tell 🌟",
//   "One application today could change everything ✨",
//   "Skills + persistence = job offer 🔑",
//   "Don’t wait for opportunity, create it ⚡",
//   "Every interview is practice for the big one 🎯",
//   "Your value isn’t defined by rejections 💼",
//   "Keep applying, keep growing 🌍",
//   "Small progress every day adds up 📈",
//   "Courage is showing up, even when it’s tough 💥",
//   "Someone is hiring for your exact skills 🧩",
//   "Your future self will thank you for not quitting 🙌",
//   "Dreams don’t work unless you do 🔨",
//   "Keep learning, keep earning 📚",
//   "Today’s effort is tomorrow’s success 🌞",
//   "The best opportunities come when you least expect them 🎁",
//   "Believe: the right company is looking for YOU 🔍",
// ];


// const Ticker: React.FC = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         const res = await api.get("/applications/upcoming-interview");
//         if (res.data?.message) {
//           // If backend gives an interview → only show that
//           setMessages([res.data.message]);
//         } else {
//           // Otherwise → shuffle quotes for variety
//           setMessages([...motivationalQuotes].sort(() => Math.random() - 0.5));
//         }
//       } catch (err) {
//         console.error("Failed to fetch interview:", err);
//         // fallback to quotes
//         setMessages([...motivationalQuotes].sort(() => Math.random() - 0.5));
//       }
//     };

//     fetchMessage();
//   }, []);

//   useEffect(() => {
//     if (messages.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % messages.length);
//       }, 4000); // 4 seconds
//       return () => clearInterval(interval);
//     }
//   }, [messages]);

//   if (messages.length === 0) return null;

//   return (
//     <div className="overflow-hidden w-[400px] whitespace-nowrap">
//       <div
//         key={currentIndex}
//         className="animate-slide text-sm text-gray-700"
//       >
//         {messages[currentIndex]}
//       </div>

//       {/* animation styles */}
//       <style>
//         {`
//           @keyframes slide {
//             from { transform: translateX(100%); opacity: 0; }
//             to { transform: translateX(0); opacity: 1; }
//           }
//           .animate-slide {
//             animation: slide 0.5s ease-in-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Ticker;



// import React, { useEffect, useState, useRef } from "react";
// import api from "../apis/api";

// const motivationalQuotes = [
//   "Stay positive, work hard, make it happen 💪",
//   "Your dream job is closer than you think 🚀",
//   "Every rejection is redirection 🔄",
//   "Consistency beats intensity 🌱",
//   "Believe in yourself — recruiters can tell 🌟",
//   "One application today could change everything ✨",
//   "Skills + persistence = job offer 🔑",
//   "Don’t wait for opportunity, create it ⚡",
//   "Every interview is practice for the big one 🎯",
//   "Your value isn’t defined by rejections 💼",
//   "Keep applying, keep growing 🌍",
//   "Small progress every day adds up 📈",
//   "Courage is showing up, even when it’s tough 💥",
//   "Someone is hiring for your exact skills 🧩",
//   "Your future self will thank you for not quitting 🙌",
//   "Dreams don’t work unless you do 🔨",
//   "Keep learning, keep earning 📚",
//   "Today’s effort is tomorrow’s success 🌞",
//   "The best opportunities come when you least expect them 🎁",
//   "Believe: the right company is looking for YOU 🔍",
// ];

// const Ticker: React.FC = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [duration, setDuration] = useState(10); // seconds
//   const containerRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         const res = await api.get("/applications/upcoming-interview");
//         if (res.data?.message) {
//           setMessages([res.data.message]);
//         } else {
//           // randomize quotes
//           setMessages([...motivationalQuotes].sort(() => Math.random() - 0.5));
//         }
//       } catch (err) {
//         console.error("Failed to fetch interview:", err);
//         setMessages([...motivationalQuotes].sort(() => Math.random() - 0.5));
//       }
//     };
//     fetchMessage();
//   }, []);

//   // Adjust scroll duration based on text length
//   useEffect(() => {
//     if (containerRef.current && textRef.current) {
//       const containerWidth = containerRef.current.offsetWidth;
//       const textWidth = textRef.current.scrollWidth;

//       // speed factor: pixels per second
//       const speed = 80;
//       const newDuration = (containerWidth + textWidth) / speed;
//       setDuration(newDuration);
//     }
//   }, [messages, currentIndex]);

//   // Handle animation end → switch to next message
//   const handleAnimationEnd = () => {
//     setCurrentIndex((prev) => (prev + 1) % messages.length);
//   };

//   if (messages.length === 0) return null;

//   return (
//     <div
//       ref={containerRef}
//       className="w-full max-w-[500px] overflow-hidden whitespace-nowrap border-b border-gray-200"
//     >
//       <div
//         key={currentIndex}
//         ref={textRef}
//         className="inline-block text-sm sm:text-base text-gray-700"
//         style={{
//           animation: `scroll ${duration}s linear forwards`,
//         }}
//         onAnimationEnd={handleAnimationEnd}
//       >
//         {messages[currentIndex]}
//       </div>

//       <style>
//         {`
//           @keyframes scroll {
//             from { transform: translateX(100%); }
//             to { transform: translateX(-100%); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Ticker;

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
      try {
        const res = await api.get("/applications/upcoming-interview");
        if (!mounted) return;
        if (res.data?.message) {
          setMessages([res.data.message]);
        } else {
          setMessages(shuffle(motivationalQuotes));
        }
        setCurrentIndex(0);
        setAnimKey((k) => k + 1);
      } catch (err) {
        console.error("Failed to fetch interview:", err);
        if (!mounted) return;
        setMessages(shuffle(motivationalQuotes));
        setCurrentIndex(0);
        setAnimKey((k) => k + 1);
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
