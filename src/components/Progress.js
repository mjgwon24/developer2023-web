/**
 * Progress
 * @since 2024.10.12
 * @lastmodified 2024.11.26
 * @author 김진수, 임석진
 */
import React, { useEffect, useRef,useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import soft_cat from "../images/practice/soft_cat.png";
import soft_cat_mark from '../images/practice/soft_cat_mark.png';
import stack_up from "../images/practice/stack_up.png";
import stack_up_mark from '../images/practice/stack_up_mark.png';

gsap.registerPlugin(ScrollTrigger);

const Progress = () => {
    const textRef = useRef(null);
    const softCatRef = useRef(null);
    const stackUpRef = useRef(null);
    const [deviceType,setDeviceType] = useState("");
 
    const getDeviceType = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width < height) return "mobile";
        if (width > 768 && width <= 1023) return "tablet";
        return "pc";

    };

    const handleStackUpClick = () => {
        window.open(
            "https://stack-up.notion.site/STACK-UP-HOME-bec5a8d5c19e42588054614f874b9571?pvs=74",
            "_blank"
        );
    };

    const handleSoftCatClick = () => {
        window.open("https://softcat.co.kr", "_blank");
    };

    useEffect(() => {
        const deviceType = getDeviceType();
         setDeviceType(deviceType);
         // 애니메이션 설정
         const animationConfig = {
             mobile: {
                 text: { start: "top 80%", end: "bottom 20%", },
                 stackUp: { start: "top 80%", end: "bottom 20%" },
                 softCat: { start: "top 75%", end: "bottom 25%", },
             },
             tablet: {
                text: { start: "top 80%", end: "bottom 20%", },
                stackUp: { start: "top 80%", end: "bottom 20%" },
                softCat: { start: "top 75%", end: "bottom 25%", },
             },
             pc: {
                text: { start: "top 80%", end: "bottom 20%", },
                stackUp: { start: "top 80%", end: "bottom 20%" },
                softCat: { start: "top 75%", end: "bottom 25%", },
             },
         };

        const config = animationConfig[deviceType];

        // // 이전 애니메이션 정리
        // const cleanupAnimations = () => {
        //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        // };
        //
        // cleanupAnimations();

         gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: config.text.start,
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(
            stackUpRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power3.out",
                immediateRender: false,
                scrollTrigger: {
                    trigger: stackUpRef.current,
                    start: config.stackUp.start,
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(
            softCatRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power3.out",
                immediateRender: false,
                scrollTrigger: {
                    trigger: softCatRef.current,
                    start: config.softCat.start,
                    toggleActions: "play none none reverse",
                },
            }
        );

        // // 창 크기 변경 이벤트 리스너
        // const handleResize = () => {
        //     const newDeviceType = getDeviceType();
        //     if (newDeviceType !== deviceType) {
        //         setDeviceType(newDeviceType);
        //     }
        // };

        // window.addEventListener('resize', handleResize);
        // return () => {
        //     window.removeEventListener('resize', handleResize);
        //     cleanupAnimations();
        // };
    }, [deviceType]);

    return (
        <div className="flex flex-col items-center pb-40 py-20">
            <h2 className="text-center text-2xl md:text-3xl weight-600 text-white md:mb-10 mb-1">
                저희는 계속해서 발전하는 중이에요!
            </h2>

            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between md:w-[800px] max-w-6xl mb-1 md:mb-4" ref={stackUpRef}>
                <div className="w-full p-2">
                    <div className="rounded-lg overflow-hidden">
                        <img src={stack_up} alt="Stack Up" className="w-full object-cover" />
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end justify-center w-full md:w-1/2 p-4">
                    <div className="flex flex-col justify-center gap-1 text-center md:text-right mb-6 text-white text-xl md:text-2xl weight-500">
                        <p># 열정으로 빚어진 크루</p>
                        <p className="text-purple-500 weight-600"># 스택-업</p>
                        <p># 너의 실력도 업</p>
                        <p># 멘토 & 멘티 활동</p>
                        <p># 알고리즘 스터디</p>
                    </div>

                    <div
                        className="flex items-center justify-center p-3 mb-4 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all duration-300 w-[280px] h-[60px]"
                        onClick={handleStackUpClick}
                    >
                        <div className="flex items-center weight-600 mr-1.5">
                            <img src={stack_up_mark} alt="StackUp Logo" className="h-8 mr-2"/>
                            <p className="md:text-lg text-white">더 알고 싶다면 <span className="text-purple-500">CLICK!</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center justify-between md:w-[800px] max-w-6xl mb-16" ref={softCatRef}>
                <div className="flex flex-col items-center md:items-start w-full md:w-1/2 p-4">
                    <div className="flex flex-col gap-1 text-center md:text-left mb-6 text-white text-xl md:text-2xl weight-500">
                        <p># 창업 동아리</p>
                        <p># 열정과 끈기</p>
                        <p className="text-blue-600 weight-600"># 소프트 캣</p>
                        <p># 꿈을 현실로!</p>
                        <p># 실전 경험치 한가득</p>
                    </div>

                    <div
                        className="flex items-center justify-center p-3 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all duration-300 w-[300px] h-[63px]"
                        onClick={handleSoftCatClick}
                    >
                        <div className="flex items-center justify-center weight-600 pr-1.5 mr-1.5">
                            <img src={soft_cat_mark} alt="SoftCat Logo" className="h-6 mr-2"/>
                            <p className="md:text-lg text-white">더 알고 싶다면 <span className="text-blue-600">CLICK!</span></p>
                        </div>
                    </div>
                </div>

                <div className="w-full p-2">
                    <div className="rounded-lg overflow-hidden">
                        <img src={soft_cat} alt="SoftCat" className="w-full object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
