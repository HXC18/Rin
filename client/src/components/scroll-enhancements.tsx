import { useEffect, useState } from "react";

export function ScrollEnhancements() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;

          if (totalHeight > 0) {
            const currentProgress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
            setProgress(currentProgress);
          } else {
            setProgress(0);
          }

          setShowBackToTop(currentScroll > 260);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      {/* 顶部全局阅读进度条 */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-theme via-purple-500 to-pink-500 transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(var(--rin-theme-rgb,99,102,241),0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 浮动返回顶部按钮（带环形进度指示与微动效） */}
      <div
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 transition-all duration-300 ease-out ${
          showBackToTop
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          title="返回顶部"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border border-black/5 dark:border-white/10 text-neutral-600 dark:text-neutral-300 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-xl hover:text-theme dark:hover:text-white"
        >
          {/* 环形进度圈 */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-neutral-200 dark:text-neutral-700/60"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-theme transition-all duration-150 ease-out"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* 向上箭头图标 */}
          <i className="ri-arrow-up-line text-lg transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </>
  );
}
