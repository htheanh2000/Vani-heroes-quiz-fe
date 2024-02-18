"use client"
import Button from "@/components/button"
import LoadingScreen from "@/components/loading"
import ModalBox from "@/components/modalBox"
import ProgressBar from "@/components/progressBar"
import Tooltip from "@/components/tooltip"
import { getQuizById } from "@/store/features/quiz/quizSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { MdArrowBack, MdExitToApp, MdQuestionMark, MdQuiz } from "react-icons/md";
import { twMerge } from "tailwind-merge"

const QuizPage = () => {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isStart, setIsStart] = useState(false)
    const quizId = searchParams.get('id') || '3';
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answerValidation, setAnswerValidation] = useState<'correct' | 'incorrect' | null>(null);


    const handleExitAttempt = () => {
        setIsModalOpen(true);
    };

    const handleConfirmExit = () => {
        // Handle the quiz exit logic here
        setIsModalOpen(false);
        router.replace('/')
        // Redirect or perform other actions as needed
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(getQuizById({ id: quizId }))
    }, [dispatch, quizId])

    const { questions } = useAppSelector((state: RootState) => state.quiz);

    const handleSelectAnswer = (index: number) => {
        setAnswerValidation(null)
        // Toggle selection for multiple answers
        if (selectedAnswers.includes(index)) {
            setSelectedAnswers(selectedAnswers.filter((answer) => answer !== index));
        } else {
            setSelectedAnswers([...selectedAnswers, index]);
        }
        // Reset validation state upon new selection
    };

    const handleSubmit = () => {
        if (selectedAnswers.length === 0) return;
        // Find all correct answers for the current question
        const correctAnswers = questions[currentQuestion].options
            .map((option: { isCorrect: any }, index: any) => option.isCorrect ? index : null)
            .filter((index: null) => index !== null);

        // Check if all selected answers are correct and the number of selected answers matches the number of correct answers
        const isCorrect = selectedAnswers.length === correctAnswers.length &&
            selectedAnswers.every(index => questions[currentQuestion].options[index].isCorrect);

        setAnswerValidation(isCorrect ? 'correct' : 'incorrect');

        setTimeout(() => {
            setAnswerValidation(null);
            setSelectedAnswers([]); // Clear selected answers for the next question
        }, 1000);

        if (!isCorrect) return;
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                router.replace('/quiz/completion');
            }
        }, 1000);
    };

    const colorCheck = (index: number) => {
        if (!selectedAnswers.includes(index)) return '';
        if (!answerValidation) {
            return 'bg-primary text-white';
        } else {
            return questions[currentQuestion].options[index].isCorrect ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100';
        }
    };


    if (!questions) return <LoadingScreen />;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary px-6 max-w-md">
            {
                isStart ?
                    <div className="w-full h-full py-8">
                        <header className="flex justify-between w-full items-center">
                            <Tooltip message={questions[currentQuestion].hint}>
                                <div className="rounded bg-slate-100/20 flex items-center justify-center p-2 text-white">
                                    <MdQuiz></MdQuiz>
                                </div>
                            </Tooltip>
                            <ProgressBar className="w-40" value={currentQuestion + 1} max={questions.length} />
                            <div onClick={handleExitAttempt} className="rounded bg-slate-100/20 flex items-center justify-center p-2 text-white">
                                <MdExitToApp className="text-xl" />
                            </div>
                        </header>
                        <article className="bg-white rounded-2xl w-full p-4 mt-8">
                            <span className="text-primary/80 uppercase font-medium text-sm my-4">Question {currentQuestion + 1} of {questions.length}</span>
                            <p className="text-md mt-4 font-medium">{questions[currentQuestion].text}</p>
                            <div className="mt-4">
                                {
                                    questions[currentQuestion].options.map((option: any, index: any) =>
                                        <div key={option.text}
                                            onClick={() => handleSelectAnswer(index)}
                                            className={twMerge(
                                                `border rounded-xl mb-4 py-3 px-4 cursor-pointer font-medium`,
                                                colorCheck(index),
                                            )}>

                                            <p className="font-medium">{option.text}</p>
                                        </div>
                                    )
                                }
                            </div>

                            <Button onClick={handleSubmit}>Next</Button>
                        </article>

                        <ModalBox
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmExit}
                            title="Confirm Exit"
                            message="Are you sure you want to exit the quiz? All progress will be lost."
                        />
                    </div> :
                    <div>
                        <h2 className="text-white font-medium text-center mb-8 text-2xl">Take a quiz and receive 1000$ coin</h2>
                        <Image sizes="100%" className="w-fit max-w-80 h-auto mx-auto" src={'/images/onboarding-1.png'} width={0} height={0} alt={``} />
                        <Button onClick={() => setIsStart(true)} style="secondary"> Start Quiz</Button>
                    </div>
            }

        </div>
    )
}

export default QuizPage