import { useEffect, useState } from "react";

import "./App.css";
import FeedbackModal from "./components/FeedbackModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);

  useEffect(() => {
    const storedFeedback = localStorage.getItem("feedback-rating");
    if (storedFeedback) {
      setFeedbackRating(parseInt(storedFeedback, 10));
    }
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFeedbackSubmit = (rating: number | null) => {
    console.log("Feedback submitted:", rating);
    setFeedbackRating(rating);
  };

  return (
    <div className="flex-1 justify-center">
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-perfume-800 dark:text-perfume-200 mb-4">
          Welcome to Feedback Modal
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We&apos;d love to hear your feedback.
        </p>
        <button
          onClick={openModal}
          className="bg-perfume-600 hover:bg-perfume-500 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-perfume-500"
        >
          Give Feedback
        </button>
        {feedbackRating !== null && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-200">
            Your previous feedback rating:{" "}
            <span className="font-semibold">{feedbackRating}/10</span>
          </p>
        )}
      </div>

      <FeedbackModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}

export default App;
