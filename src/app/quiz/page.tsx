"use client"
import Button from "@/components/button"
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
    const [isStart, setIsStart] = useState(true)
    const quizId = searchParams.get('id') || '';
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleExitAttempt = () => {
        setIsModalOpen(true);
    };

    const handleConfirmExit = () => {
        // Handle the quiz exit logic here
        console.log('Quiz exited');
        setIsModalOpen(false);
        router.replace('/')
        // Redirect or perform other actions as needed
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    console.log(selectedAnswer);

    useEffect(() => {
        dispatch(getQuizById({ id: quizId }))
    }, [])

    const { questions, status } = useAppSelector((state: RootState) => state.quiz);
    // console.log("questions", questions);

    const handleSubmit = () => {
        if (selectedAnswer == questions[currentQuestion].options.optionId) {

        }
    }
    if (!questions) return null;

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
                            <ProgressBar className="w-40" value={10} max={20} />
                            <div onClick={handleExitAttempt} className="rounded bg-slate-100/20 flex items-center justify-center p-2 text-white">
                                <MdExitToApp className="text-xl" />
                            </div>
                        </header>
                        <article className="bg-white rounded-2xl w-full p-4 mt-8">
                            <span className="text-primary/80 uppercase font-medium text-sm my-4">Question {currentQuestion + 1} of 10</span>
                            <p className="text-md mt-4 font-medium">{questions[currentQuestion].text}</p>
                            <div className="mt-4">
                                {
                                    questions[currentQuestion].options.map((option: any) =>
                                        <div onClick={() => setSelectedAnswer(option.optionId)} key={option.text}
                                            className={`border border-primary rounded-xl mb-4 py-3 px-4 cursor-pointer ${selectedAnswer === option.optionId ? 'bg-primary/80 text-white' : ''
                                                }`}>
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