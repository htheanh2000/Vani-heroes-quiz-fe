"use client"
import Button from "@/components/button"
import ProgressBar from "@/components/progressBar"
import { getQuizById } from "@/store/features/quiz/quizSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MdArrowBack, MdQuestionMark, MdQuiz } from "react-icons/md";

const QuizPage = () => {

    const dispatch = useAppDispatch();
    const searchParams = useSearchParams()
    const [isStart, setIsStart] = useState(true)
    const quizId = searchParams.get('id') || '';
    const [currentQuestion, setCurrentQuestion] = useState(0);
    useEffect(() => {
        dispatch(getQuizById({ id: quizId }))
    }, [])

    const { questions, status } = useAppSelector((state: RootState) => state.quiz);
    console.log("questions", questions);

    if(!questions) return null;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary px-6 max-w-md">
            {
                isStart ?
                    <div className="w-full h-full py-8">
                        <header className="flex justify-between w-full items-center">
                            <div className="rounded bg-slate-100/20 flex items-center justify-center p-2 text-white">
                                <MdArrowBack className="text-xl" />
                            </div>
                            <ProgressBar className="w-40" value={10} max={20} />
                            <div className="rounded bg-slate-100/20 flex items-center justify-center p-2 text-white">
                                <MdQuiz></MdQuiz>
                                <span>{currentQuestion + 1}</span>
                            </div>
                        </header>
                        <article className="bg-white rounded-2xl w-full p-4 mt-8">
                            <span className="text-primary/80 uppercase font-medium text-sm my-4">Question {currentQuestion + 1} of 10</span>
                            <p className="text-md mt-4 font-medium">{questions[currentQuestion].text}</p>
                            <div className="mt-4">
                                {
                                    questions[currentQuestion].options.map((option: any) =>
                                        <div key={option.text} className="border border-primary rounded-xl mb-4 py-3 px-4">
                                            <p className="font-medium">{option.text}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </article>
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