import Carousel from "@/components/carousel"

const items = [
    '/images/onboarding-1.png',
    '/images/onboarding-2.png',
    '/images/onboarding-3.png',
  ];
  

  
const OnboardingPage = () => {
    return (
        <div className="mx-auto max-w-screen-sm h-screen bg-primary flex justify-center items-center">
            <Carousel items={items} />
        </div>
    )
}

export default OnboardingPage