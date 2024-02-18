import Button from "@/components/button";
import Carousel from "@/components/carousel"

const items = [
    '/images/onboarding-1.png',
    '/images/onboarding-2.png',
    '/images/onboarding-3.png',
];



const OnboardingPage = () => {
    return (
        <div className="mx-auto max-w-screen-sm h-screen bg-primary flex flex-col justify-center items-center">
            <Carousel items={items} />
            <div className="flex relative flex-col items-center self-center px-4 py-6 mt-6 w-full text-base font-medium leading-6 text-center bg-white rounded-3xl max-w-[344px]">
                <div className="text-2xl leading-9 text-black">
                    Take part in challenges with friends
                </div>
                <Button>Sign Up</Button>
                <div className="mt-5">
                    <span className="text-gray">Already have an account? </span>
                    <span className="font-medium text-primary">Login</span>
                </div>
            </div>

        </div>
    )
}

export default OnboardingPage