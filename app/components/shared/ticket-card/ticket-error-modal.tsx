import { useEffect } from "react";

interface TicketErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="cursor-pointer p-0 bg-transparent border-none"
    aria-label="Close modal"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" role="img">
      <title>Close</title>
      <path
        d="M19 5L5 19"
        stroke="#F1F2F3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L19 19"
        stroke="#F1F2F3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export const TicketErrorModal = ({
  isOpen,
  onClose,
}: TicketErrorModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black/30 backdrop-blur-[16px]">
      {/* Click outside to close */}
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-[640px] mx-4 bg-[#282828] rounded-lg border-b border-[rgba(198,198,198,0.3)]">
        <div className="relative flex flex-col items-center gap-6 p-8 lg:p-12 text-center">
          {/* Close button */}
          <div className="absolute top-6 right-6 lg:top-12 lg:right-12">
            <CloseIcon onClick={onClose} />
          </div>

          {/* Sorry badge */}
          <div className="rounded-[20px] px-4 py-2">
            <img src="/svg/sorry.svg" alt="Sorry" />
          </div>

          {/* Title */}
          <h2 className="text-[#F1F2F3] text-2xl font-bold font-sans">
            Sorry, you can only purchase 1 ticket
          </h2>

          {/* Description */}
          <p className="text-[#F1F2F3] text-base leading-relaxed max-w-[480px]">
            Each account is eligible to purchase only one ticket. For multiple
            ticket purchase, please ask your friends to register individually.
          </p>
        </div>
      </div>
    </div>
  );
};
