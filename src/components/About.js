/**
 * About 컴포넌트
 * @author 김진수
 * @since 2024.09.17
 * @lastmodified 2024.09.20
 */
 import React, { useEffect, useRef,useState } from "react";
 import { gsap } from "gsap";
 import { ScrollTrigger } from "gsap/ScrollTrigger";
 
 import img from '../images/practice/img.png';
 import img2 from '../images/practice/img2.png';
 
 gsap.registerPlugin(ScrollTrigger);
 
 function About() {
    const imgRef1 = useRef(null);
    const imgRef2 = useRef(null);
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
                img1: { start: "top 80%", end: "bottom 20%", },
                img2: { start: "top 80%", end: "bottom 20%", },
                text: { start: "top 15%", end: "bottom 5%", },
            },
            tablet: {
                img1: { start: "top 80%", end: "bottom 20%", },
                img2: { start: "top 80%", end: "bottom 20%" },
                text: { start: "top 75%", end: "bottom 25%", },
            },
            pc: {
                img1: { start: "top 75%", end: "bottom 10%", },
                img2: { start: "top 80%", end: "bottom 20%" },
                text: { start: "top 75%", end: "bottom 25%", },
            },
        };
 
         const config = animationConfig[deviceType];
 
         gsap.fromTo(
             imgRef1.current,
             config.img1,
             {
                 opacity: 1,
                 x: 0,
                 duration: 1,
                 scrollTrigger: {
                     trigger: imgRef1.current,
                     start: config.img1.start,
                     end: config.img1.end,
                     scrub: 1,
                 },
             }
         );
 
         textRefs.current.forEach((textRef) => {
             gsap.fromTo(
                 textRef,
                 config.text,
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
         });
 
         gsap.fromTo(
             imgRef2.current,
             config.img2,
             {
                 opacity: 1,
                 x: 0,
                 duration: 1,
                 scrollTrigger: {
                     trigger: imgRef2.current,
                     start: config.img2.start,
                     end: config.img2.end,
                     scrub: 1,
                 },
             }
         );
     }, []);

     return (
         <div className="py-20">
             <div className="flex flex-col items-center">
                 <h2 className="text-2xl md:text-3xl weight-600 text-white content-center"
                     ref={(el) => textRefs.current.push(el)}>
                     끊임없이 만들어지는 우리의 이야기
                 </h2>
             </div>

             <div className="flex flex-col md:flex-row items-center justify-center pt-16 gap-5 md:gap-10 mb-4 md:mb-0 w-full">
                 <img ref={imgRef1} src={img} alt="팀 활동 이미지"
                      className="w-full md:w-1/2 max-w-lg md:mr-8"/>
                 <div className="w-full md:w-1/2 max-w-lg mt-1 md:mt-0 text-center md:text-left md:text-xl text-gray-300">
                     <p className="weight-400 leading-relaxed pb-2 md:pb-10"
                        ref={(el) => textRefs.current.push(el)}>
                         <span className="weight-600 text-purple-500">DEVELOPER</span>는<br/>
                         개발자의 꿈을 가진, 성장하고 싶은 대학생을 위한<br/>
                         <span className="weight-600 text-purple-500">IT 학술 동아리</span>입니다.
                     </p>
                     <p className="weight-400 leading-relaxed"
                        ref={(el) => textRefs.current.push(el)}>
                         틀에 박힌 딱딱한 공부가 아닌,<br/>
                         직접 창작하고 개발하는{" "}
                         <span className="weight-600 text-purple-500">프로젝트형 활동방식</span>
                         을 추구하여<br/>
                         스스로의 역량을 계속해서 발전시킬 기회를 제공합니다.
                     </p>
                 </div>
             </div>

             <div
                 className="flex flex-col-reverse md:flex-row items-center justify-center py-10 gap-5 md:gap-10 mb-4 md:mb-0 w-full">
                 <div className="w-full md:w-1/2 max-w-lg mt-1 md:mt-0 text-center md:text-left md:text-xl text-gray-300">
                     <p className="weight-400 leading-relaxed pb-2 md:pb-10"
                        ref={(el) => textRefs.current.push(el)}>
                         팀원들과 함께 원하는 개발 프로젝트를 진행하고,<br/>
                         발표를 통해 다른 팀들과 피드백을 하며 성장하세요.
                     </p>
                     <p className="weight-400 leading-relaxed"
                        ref={(el) => textRefs.current.push(el)}>
                         자유롭게 열려있는 분위기 속에서 팀원들과<br/>
                         <span className="weight-600 text-purple-500">협업 활동</span>을 통해{" "}
                         <span className="weight-600 text-purple-500">실력 상승</span>을 경험해 보세요!
                     </p>
                 </div>
                 <img ref={imgRef2} src={img2} alt="발표 이미지" className="w-full md:w-1/2 max-w-lg"/>
             </div>
         </div>
    );
 }

export default About;
 