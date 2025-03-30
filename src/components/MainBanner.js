/**
 * MainBanner
 * @since 2024.10.10
 * @lastmodified 2025.03.30
 * @author 임석진, 권민지
 */
import React, { useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MainBanner = () => {
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);

    const text = `if user == "developer":\n` +
        `    input("Keep coding,\n` +
        `           keep learning,\n` +
        `           keep growing!")\n` +
        `    print("Success is your life!")\n` +
        `else:\n` +
        `    print("Curiosity is the first step.")`;

    useEffect(() => {
        gsap.fromTo(
            text1Ref.current,
            { opacity: 0, x: -100 },
            {
                opacity: 1,
                x: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: text1Ref.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(
            text2Ref.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: text2Ref.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <div className="w-full min-h-[80vh] flex flex-col justify-center items-center md:flex-row bg-black">
            <div
                className="flex flex-col justify-center items-center md:justify-between md:w-[1220px] md:flex-row bg-black">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8" ref={text2Ref}>
                    <p className="weight-500 text-gray-300 md:text-xl ml-5 mb-1 md:mb-2 text-center md:text-left w-full">
                        개발을 통해 성장하는 우리들의 이야기
                    </p>
                    <div
                        className="frank-800 text-4xl md:text-6xl font-bold text-white ml-5 text-center md:text-left w-full">DEVELOPER
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center hidden md:block justify-center p-4">
                    <div className="w-full" ref={text1Ref}>
            <pre
                className="frank-600 text-[32px] pt-5 text-[rgba(74,182,37,0.52)] font-extrabold relative z-10">
                <Typewriter
                    words={[text]}
                    loop={1}
                    cursor
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;
