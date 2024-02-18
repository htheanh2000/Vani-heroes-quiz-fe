import Button from "@/components/button";
import Link from "next/link";

interface QuizCompletionProps {
  totalQuestions: number;
  correctAnswers: number;
}


const QuizCompletion: React.FC<QuizCompletionProps> = ({ totalQuestions, correctAnswers }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary px-6 text-white">
      <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-8">
        You solved all the quizzes correctly!
      </p>
      <div className="flex flex-col space-y-4">
        <Link href='/'>
        <Button  style="secondary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizCompletion;
