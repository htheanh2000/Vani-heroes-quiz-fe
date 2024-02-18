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
    const [isStart, setIsStart] = useState(false)
    const quizId = searchParams.get('id') || '3';
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
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
    }, [])

    const { questions } = useAppSelector((state: RootState) => state.quiz);

    const handleSubmit = () => {
        
        if(selectedAnswer == null) return ;    
        const isCorrect =  questions[currentQuestion].options[selectedAnswer].isCorrect;
        setAnswerValidation(isCorrect ? 'correct' : 'incorrect');
        if(!isCorrect)  return;
        // Wait 1000ms before moving to the next question or showing results
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                // Move to the next question
                setCurrentQuestion(currentQuestion + 1);
                // Reset selected answer and validation state for the next question
                setSelectedAnswer(null);
                setAnswerValidation(null);
            } else {
                // Handle quiz completion
                router.replace('/quiz/completion')
                // console.log('Quiz completed');
                // Redirect or update state to show quiz results
            }
        }, 1000);
    };

    const colorCheck = (index: null) => {
        if(selectedAnswer != index) return '' ;
        // only check selectedAnswer
        if(!answerValidation) {
            return 'bg-primary text-white' ;
        }
        else {
            if(answerValidation === 'correct') return 'border-green-500 bg-green-100'
            else return 'border-red-500 bg-red-100'
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
                            <ProgressBar className="w-40" value={currentQuestion+1} max={questions.length} />
                            <div onClick={handleExitAttempt} className="rounded bg-slate-100/20 flex items-center justify-center p-2 text-white">
                                <MdExitToApp className="text-xl" />
                            </div>
                        </header>
                        <article className="bg-white rounded-2xl w-full p-4 mt-8">
                            <span className="text-primary/80 uppercase font-medium text-sm my-4">Question {currentQuestion + 1} of {questions.length}</span>
                            <p className="text-md mt-4 font-medium">{questions[currentQuestion].text}</p>
                            <div className="mt-4">
                                {
                                    questions[currentQuestion].options.map((option: any, index:any) =>
                                        <div onClick={() => {
                                            setSelectedAnswer(index) ;
                                             setAnswerValidation(null)
                                        }} key={option.text}
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