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
                text: { start: "top 0%", end: "bottom 0%", },
                stackUp: { start: "top 200%", end: "bottom 0%", },
                softCat: { start: "top 195%", end: "bottom 5%", },
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
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: stackUpRef.current,
                    start: config.stackUp.start,
                    toggleActions: "play none none reverse",
                    
                },
            }
        );

        gsap.fromTo(
            softCatRef.current,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: softCatRef.current,
                    start: config.softCat.start,
                    toggleActions: "play none none reverse",
                    
                },
            }
        );
    }, []);

    return (
        <div className="display-flex-column align-items-center padding85-0 progess justify-center" style={{width:"100%"}}>
            <div ref={textRef} className="font-size-36 weight-700 color-white">
                저희는 계속해서 발전하는 중이에요!
            </div>

            <div className="content" ref={stackUpRef} >{/* style={{width: "1050px"}} */}
                <div className="progress-image-container">
                    <div className="image-placeholder">
                        <img src={stack_up} alt="Stack Up" className="imac-image" />
                    </div>
                </div>

                <div>
                    <div className="progress-text-container progress-text-align-right">
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 열정으로 빚어진 크루</p>
                        <p className="representative-color weight-600 color-white margin-bottom-10 subscription">
                            # 스택-업
                        </p>
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 너의 실력도 업</p>
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 멘토 & 멘티 활동</p>
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 알고리즘 스터디</p>
                    </div>

                    <div
                        className="progress-logo-button"
                        style={{width: "280px", height: "60px"}}
                        onClick={handleStackUpClick}
                    >
                        <div className="progress-button-content" style={{marginRight: "5px"}}>
                            <img src={stack_up_mark} alt="StackUp Logo" className="stack-up-logo-image"/>
                            <p className="weight-700 font-size-18">더 알고 싶다면 <span className="representative-color">CLICK!</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content reverse" ref={softCatRef}>
                <div className="progress-image-container">
                    <div className="image-placeholder">
                        <img src={soft_cat} alt="Stack Up" className="imac-image"/>
                    </div>
                </div>

                <div style={{marginLeft: "50px"}}>
                    <div className="progress-text-container progress-text-align-left">
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 창업 동아리</p>
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 열정과 끈기</p>
                        <p className="softcat-color weight-600 margin-bottom-10 subscription"># 소프트 캣</p>
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 꿈을 현실로!</p>
                        <p className="weight-600 color-white margin-bottom-10 subscription"># 실전 경험치 한가득</p>
                    </div>

                    <div
                        className="progress-logo-button"
                        style={{width: "300px", height: "63px"}}
                        onClick={handleSoftCatClick}
                    >
                        <div className="display-flex align-items-center justify-center padding-right-5" style={{marginRight: "5px"}}>
                            <img src={soft_cat_mark} alt="SoftCat Logo" className="soft-cat-logo-image"/>
                            <p className="weight-700 font-size-18">더 알고 싶다면 <span className="softcat-color">CLICK!</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;
