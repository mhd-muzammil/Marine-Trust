import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { quizData } from "../data/quizData";
import ProgressBar from "../components/quiz/ProgressBar";
import ResultScreen from "../components/quiz/ResultScreen";

/* 🔹 Hook to get full window size */
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export default function MarineQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finished, setFinished] = useState(false);

  const { width, height } = useWindowSize(); // 🔹 important
  const current = quizData[index];

  const handleSelect = (option) => {
    if (selected) return;

    setSelected(option);
    const isCorrect = option === current.answer;

    const newAnswers = [...answers];
    newAnswers[index] = isCorrect ? "correct" : "wrong";
    setAnswers(newAnswers);

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }

    setTimeout(() => {
      if (index === quizData.length - 1) {
        setFinished(true);
      } else {
        setIndex(index + 1);
        setSelected(null);
      }
    }, 1200);
  };

  if (finished) return <ResultScreen answers={answers} />;

  return (
    <div className="min-h-screen bg-[#011f33] text-white px-6 relative">
      {/* 🎉 FULL SCREEN CONFETTI */}
      {showConfetti && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={400}
            gravity={0.25}
          />
        </div>
      )}

      <ProgressBar answers={answers} />

      <h2 className="text-sm text-gray-300 mt-6">Question {index + 1}/5</h2>

      <h1 className="text-xl font-semibold mt-3">{current.question}</h1>

      <div className="mt-6 space-y-4">
        {current.options.map((opt) => {
          let style = "bg-[#0b3954]";
          if (selected) {
            if (opt === current.answer) style = "bg-green-600";
            else if (opt === selected) style = "bg-red-600";
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`w-full py-4 rounded-xl transition ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
