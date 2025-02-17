/**
 * MainBanner
 * @since 2024.10.10
 * @lastmodified 2024.12.05
 * @author 임석진
 */
import React, { useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// ScrollTrigger 플러그인 등록
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
        // 첫 번째 텍스트 애니메이션
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

        // 두 번째 텍스트 애니메이션
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
        <div className="main-background">
            <div className="left-container" ref={text2Ref}>
                <p className="weight-500 color-white font-size-24 margin-left-20">
                    개발을 통해 성장하는 우리들의 이야기
                </p>
                <div className="developer-text">DEVELOPER</div>
            </div>

            <div className="right-container">
                <div className="code-output fade-in">
                    <pre
                        style={{
                            position: "relative",
                            color: "rgba(74,182,37,0.52)",
                            fontFamily: "'Frank Ruhl Libre', serif",
                            fontSize: "41x",
                            fontStyle: "normal",
                            fontWeight: 800,
                            lineHeight: "normal",
                            zIndex: 10
                        }}
                    >
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
    );
};

export default MainBanner;
