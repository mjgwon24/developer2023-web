/**
 *
 * AboutAchievement 컴포넌트
 * @author 김진수, 권민지
 * @since 2024.11.26
 * @lastmodified 2024.12.09
 */

import React, {useEffect, useRef, useState} from "react";

import hackertonImg2_2 from '../../images/achievements/hackerton2_2.png';
import hackertonImg1_1 from '../../images/achievements/hackerton1_1.png';
import hackertonImg1_2 from '../../images/achievements/hackerton1_2.png';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutAchievement() {
    const textRefs = useRef([]);
    const [deviceType,setDeviceType] = useState("");

    const getDeviceType = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width < height) return "mobile";
        if (width > 768 && width <= 1023) return "tablet";
        return "pc";

    };
    useEffect(() => {
        const deviceType = getDeviceType();
        setDeviceType(deviceType);
        const animationConfig = {
            mobile: {
                text: { start: "top 150%", end: "bottom 100%", },
            },
            tablet: {
                text: { start: "top 75%", end: "bottom 25%", },
            },
            pc: {
                text: { start: "top 75%", end: "bottom 25%", },
            },
        };
 
         const config = animationConfig[deviceType];
        textRefs.current.forEach((textRef, index) => {
            gsap.fromTo(
                textRef,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: textRef,
                        start: config.text.start,
                        end: config.text.end,
                        scrub: 1
                    },
                }
            );
        });

        textRefs.current.forEach((textRef, index) => {
            if (index >= 4) {
                gsap.fromTo(
                    textRef,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: textRef,
                            start: config.text.start,
                            end: config.text.end,
                            scrub: 1,
                        },
                    }
                );
            }
        });
    }, []);


    return (
        <div className="py-[100px] flex flex-col items-center">
            <div className="flex flex-col items-center pb-10">
                <h2 className="text-center text-2xl md:text-3xl weight-600 text-white md:mb-10 mb-1"
                    ref={(el) => textRefs.current.push(el)}>
                    우리가 이룬 업적들
                </h2>
            </div>

            <div className="flex flex-col items-center pb-15">
                <div className="flex flex-col md:flex-row p-5">
                    <img src={hackertonImg2_2} className="w-[500px] rounded-xl p-5"
                         alt="2024 경주 지역문제해결 해커톤 최우수상"
                         ref={(el) => textRefs.current.push(el)}/>
                    <img src={hackertonImg2_2} className="w-[500px] rounded-xl p-5"
                         alt="2024 경주 지역문제해결 해커톤 최우수상"
                         ref={(el) => textRefs.current.push(el)}/>
                </div>

                <p className="text-2xl weight-600 text-white mb-2"
                   ref={(el) => textRefs.current.push(el)}
                >
                    2024 경주 지역문제해결 해커톤 최우수상
                </p>
                <p className="text-lg text-gray-300 mb-10"
                   ref={(el) => textRefs.current.push(el)}
                >
                    권민지, 김이현, 전상은, 전형주
                </p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row p-5">
                    <img src={hackertonImg1_1} className="w-[500px] rounded-xl p-5"
                         alt="2024 Hackers Ground 해커톤 최우수상"
                         ref={(el) => textRefs.current.push(el)}/>
                    <img src={hackertonImg1_2} className="w-[500px] rounded-xl p-5"
                         alt="2024 Hackers Ground 해커톤 최우수상"
                         ref={(el) => textRefs.current.push(el)}/>
                </div>

                <p className="text-2xl weight-600 text-white mb-2"
                   ref={(el) => textRefs.current.push(el)}
                >
                    2024 Hackers Ground 해커톤 최우수상
                </p>
                <p className="text-lg text-gray-300"
                   ref={(el) => textRefs.current.push(el)}>
                    김동민, 김현나
                </p>
            </div>
        </div>
    );
}

export default AboutAchievement;