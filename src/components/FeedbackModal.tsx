import React, { useState, useEffect } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number | null) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRating(null);
    }
  }, [isOpen]);

  const handleRatingSelect = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onSubmit(rating);
    onClose();
    if (rating !== null) {
      localStorage.setItem("feedback-rating", String(rating));
    }
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-perfume-200 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-perfume-950 text-white rounded-lg shadow-xl p-8 relative w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-300 focus:outline-none"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">
          How likely are you to recommend FrontendPro <br /> to someone you
          know?
        </h2>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4 text-center">
          {[...Array(10)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handleRatingSelect(index + 1)}
              className={`rounded-md py-2 text-sm font-medium ${
                rating === index + 1
                  ? "bg-perfume-700 hover:bg-perfume-600 focus:outline-none focus:ring-2 focus:ring-perfume-500"
                  : "bg-perfume-800 hover:bg-perfume-700 focus:outline-none focus:ring-2 focus:ring-perfume-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-sm font-semibold text-gray-400 mb-4">
          <span>Not likely at all</span>
          <span>Extremely likely</span>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="bg-transparent text-white font-semibold py-2 px-8 border border-perfume-500 hover:border-transparent rounded focus:outline-none focus:ring-2 focus:ring-perfume-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-perfume-600 hover:bg-perfume-500 text-white font-semibold py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-perfume-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
