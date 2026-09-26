import React from "react";
import Link from "next/link";

export const FitLogLogo: React.FC<{ className?: string; linkToHome?: boolean }> = ({
  className = "",
  linkToHome = true,
}) => {
  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Custom stylized dumbbell icon matching the Figma logo */}
      <svg
        className="w-7 h-7 text-[#ccff00]"
        viewBox="0 0 28 28"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 4.5L4.5 6.5C4.1 6.9 4.1 7.5 4.5 7.9L7.9 11.3C8.3 11.7 8.9 11.7 9.3 11.3L11.3 9.3C11.7 8.9 11.7 8.3 11.3 7.9L7.9 4.5C7.5 4.1 6.9 4.1 6.5 4.5ZM9.7 12.1L12.1 9.7L18.3 15.9L15.9 18.3L9.7 12.1ZM16.7 20.1L20.1 16.7C20.5 16.3 21.1 16.3 21.5 16.7L23.5 18.7C23.9 19.1 23.9 19.7 23.5 20.1L20.1 23.5C19.7 23.9 19.1 23.9 18.7 23.5L16.7 21.5C16.3 21.1 16.3 20.5 16.7 20.1ZM4 9.5L6.5 7L7 7.5L4.5 10L4 9.5ZM18 23.5L20.5 21L21 21.5L18.5 24L18 23.5Z"
          fill="currentColor"
        />
        {/* Additional weight plate accents for distinct gym dumbbell look */}
        <rect
          x="3.2"
          y="6.2"
          width="5.5"
          height="2.4"
          rx="1"
          transform="rotate(45 3.2 6.2)"
          fill="currentColor"
        />
        <rect
          x="17.2"
          y="20.2"
          width="5.5"
          height="2.4"
          rx="1"
          transform="rotate(45 17.2 20.2)"
          fill="currentColor"
        />
        <rect
          x="6.5"
          y="15.5"
          width="15"
          height="2.5"
          rx="1.2"
          transform="rotate(-45 6.5 15.5)"
          fill="currentColor"
        />
      </svg>
      <span className="font-extrabold tracking-wider text-xl text-white uppercase font-display">
        FITLOG
      </span>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
};
