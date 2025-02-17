import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCardBox from "./ProjectCardBox";
import projectsData from "../data/project.json";

import { Button } from "react-scroll";
    /**
     * ProjectPage 컴포넌트
     * @since 2024.9.26
     * @lastmodified 2024.12.08
     */

    gsap.registerPlugin(ScrollTrigger);

    const Project = () => {
        //최신4개 고르기
        //점은 오른쪽으로
        const [projects, setProjects] = useState([]); // 프로젝트 데이터
        const [currentIndex, setCurrentIndex] = useState(1); // 현재 활성화된 카드 인덱스
        const [projectCount, setProjectCount] = useState(4); // 표시할 프로젝트 개수
        const getMiddleSlice = (arr, count) => {
            const mid = Math.floor(arr.length / 2);
            const start = Math.max(0, mid - Math.floor(count / 2));
            const end = start + count;
            return arr.slice(start, end);
        };
        const [cards,setCards] = useState(getMiddleSlice(projects, 5));

        

        const [MoveEvent,setEvent] = useState(false);
        const [MoveEventReverse,setEventReverse] = useState(false);
        
        const nextImage = () => {
            setEvent(true)
            setCurrentIndex((currentIndex-1)%(projectCount))
            setTimeout(()=>{
                setEvent(false);
                setProjects((prevArray) => {
                    const last = prevArray[prevArray.length - 1];
                    const rest = prevArray.slice(0, -1);
                    return [last, ...rest];
                });
                setCards(getMiddleSlice(projects, 5));
            },450)
        }
        const prevImage = () => {
            setEventReverse(true)
            setCurrentIndex((currentIndex+1+projectCount)%(projectCount))
            setTimeout(()=>{
                setEventReverse(false);
                setProjects((prevArray) => {
                    const first = prevArray[0];
                    const rest = prevArray.slice(1);
                    return [...rest,first];
                });
                setCards(getMiddleSlice(projects, 5));
            },450)
        }
        useEffect(() => {
            const interval = setInterval(() => {
                prevImage();
            }, 3000);
        
            return () => {
              clearInterval(interval);
            };
          }, [projects,currentIndex]);

        const containerRef = useRef(null);
        const cardsRef = useRef([]);
        // 프로젝트 데이터 설정
        useEffect(() => {
            let filteredProjects = [];
            filteredProjects = Object.entries(projectsData).flatMap(([season, projects]) =>
                projects.map(project => ({
                ...project,
                season
                }))
            );
            filteredProjects.reverse(); // 최신 시즌이 먼저 나오도록 역순
            //카드가 5개이기 때문에 5의 배수를 맞춰줘야 함
            // setProjects([...filteredProjects.slice(-1*projectCount),...filteredProjects.slice(-1*projectCount),...filteredProjects.slice(-1*projectCount),...filteredProjects.slice(-1*projectCount),...filteredProjects.slice(-1*projectCount)]);
            setProjects(Array.from({ length: 5 }, () => filteredProjects.slice(-1*projectCount)).flat());
            setCards(getMiddleSlice(projects, 5));
            console.log(projects);
        }, [projectsData]);

        useEffect(() => {

            const projectTextElements = containerRef.current.querySelectorAll(".project-text");
            const projectLink = containerRef.current.querySelector(".project-link");
            const projectCards = containerRef.current.querySelector(".project-cards");

            // 제목과 설명 애니메이션
            if (projectTextElements.length > 0) {
                gsap.fromTo(
                    projectTextElements,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            end: "bottom 25%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
            // 카드 애니메이션
            if (projectCards) {
                gsap.fromTo(
                    projectCards,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: projectCards,
                            start: "top 90%",
                            end: "bottom 30%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // "더 보러가기" 링크 애니메이션
            if (projectLink) {
                gsap.fromTo(
                    projectLink,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: projectLink,
                            start: "top 90%",
                            end: "bottom 35%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, [containerRef.current]);
        // 하단 점 클릭 시 슬라이드 이동
        const handleDotClick = async(index) => {
            if (currentIndex !== index ) {
                //회전 방향 선택
                const rightDistance = (index - currentIndex + projectCount) % projectCount;
                const leftDistance = (currentIndex - index + projectCount) % projectCount;

                if (rightDistance <= leftDistance) {
                    prevImage();
                } else {
                    nextImage();
                }
                setCurrentIndex(index)
            }
        };

        

        return (
            <div className="text-align-center padding85-0" ref={containerRef}>
                <div className="display-flex flex-direction-column gap-1r margin-bottom-60">
                    <h2 className="project-list-title">
                        달려온 결과
                    </h2>
                    <p className="project-list-subscription weight-400 project-text color-white">
                        저희가 만든 프로젝트, 궁금하신가요?
                    </p>                 
                </div>
                <div className="flex flex-col w-[75rem] rounded-[0.914375rem] bg-[#FFB020] pt-[1.25rem] px-[1.875rem] pb-[2rem] project-cards">
                    <div style={{display:"flex",justifyContent:"center",gap:"30px",minHeight:"460px"}} className={`${MoveEvent?`l-effect`:""} ${MoveEventReverse?`r-effect`:""}`}>
                        {cards.map((project, index) => {
                            return (
                                <div className="flex flex-col justify-center items-center h-[600px]" style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                    <ProjectCardBox project={project} moveEvent={MoveEvent} moveEventReverse={MoveEventReverse} index={index} type="MainPage" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 하단 점 */}
                <div className="display-flex justify-center project-text" style={{ position: 'relative', gap: '10px', marginTop: '20px' }}>
                    {Array.from({ length: projectCount }).map((_, index) => (
                        <div
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`${currentIndex === index?'dot selected':'dot'}`}
                            
                        />
                    ))}
                </div>


                {/* 더 보기 링크 */}
                <div className="project-text show-more">
                    <p className="weight-400 color-gray project-link" onClick={() => window.location.href = "/project"}>
                        더 보러가기 &gt;
                    </p>
                </div>
            </div>
        );
    };

    export default Project;
