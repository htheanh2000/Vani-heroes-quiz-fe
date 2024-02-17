// components/Carousel.tsx
"use client"
import { useState } from 'react';
import Image from "next/image"

interface CarouselProps {
    items: string[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    return (
        <div className="">
            <div className="flex justify-center items-center w-full">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full ${index === currentIndex ? 'block' : 'hidden'}`}
                    >
                        <Image sizes="100%" className="w-fit max-w-80 h-auto mx-auto" src={item} width={0} height={0} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center p-4">
                {items.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`inline-block h-3 w-3 mx-1 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
