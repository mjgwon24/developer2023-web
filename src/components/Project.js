import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCardBox from "./ProjectCardBox";
import projectsData from "../data/project.json";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectPage 컴포넌트
 * @since 2024.9.26
 * @lastmodified 2024.12.08
 */
const Project = () => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [projectCount, setProjectCount] = useState(3);
    const getMiddleSlice = (arr, count) => {
        const mid = Math.floor(arr.length / 2);
        const start = Math.max(0, mid - Math.floor(count / 2));
        const end = start + count;
        return arr.slice(start, end);
    };
    const [cards, setCards] = useState(getMiddleSlice(projects, 3));

    const [MoveEvent, setEvent] = useState(false);
    const [MoveEventReverse, setEventReverse] = useState(false);

    const nextImage = () => {
        setEvent(true);
        setCurrentIndex((currentIndex - 1) % projectCount);
        setTimeout(() => {
            setEvent(false);
            setProjects((prevArray) => {
                const last = prevArray[prevArray.length - 1];
                const rest = prevArray.slice(0, -1);
                return [last, ...rest];
            });
            setCards(getMiddleSlice(projects, 3));
        }, 450);
    };

    const prevImage = () => {
        setEventReverse(true);
        setCurrentIndex((currentIndex + 1 + projectCount) % projectCount);
        setTimeout(() => {
            setEventReverse(false);
            setProjects((prevArray) => {
                const first = prevArray[0];
                const rest = prevArray.slice(1);
                return [...rest, first];
            });
            setCards(getMiddleSlice(projects, 3));
        }, 450);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            prevImage();
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [projects, currentIndex]);

    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        let filteredProjects = [];
        filteredProjects = Object.entries(projectsData).flatMap(([season, projects]) =>
            projects.map(project => ({
                ...project,
                season
            }))
        );
        filteredProjects.reverse();
        setProjects(Array.from({ length: 3 }, () => filteredProjects.slice(-1 * projectCount)).flat());
        setCards(getMiddleSlice(projects, 3));
    }, [projectsData]);

    useEffect(() => {
        const projectTextElements = containerRef.current.querySelectorAll(".project-text");
        const projectLink = containerRef.current.querySelector(".project-link");
        const projectCards = containerRef.current.querySelector(".project-cards");

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

    const handleDotClick = async (index) => {
        if (currentIndex !== index) {
            const rightDistance = (index - currentIndex + projectCount) % projectCount;
            const leftDistance = (currentIndex - index + projectCount) % projectCount;

            if (rightDistance <= leftDistance) {
                prevImage();
            } else {
                nextImage();
            }
            setCurrentIndex(index);
        }
    };

    return (
        <div className="text-center py-20" ref={containerRef}>
            <div className="flex flex-col gap-4 mb-10 md:mb-4">
                <h2 className="text-2xl md:text-3xl weight-600 text-white content-center">
                    달려온 결과
                </h2>
                <p className="weight-500 text-white text-lg text-gray-300">
                    저희가 만든 프로젝트, 궁금하신가요?
                </p>
            </div>
            <div className="flex flex-col w-full max-w-5xl px-7 project-cards mx-auto">
                <div className={`flex flex-col md:flex-row items-center md:justify-center gap-10 min-h-[460px] ${MoveEvent ? "l-effect" : ""} ${MoveEventReverse ? "r-effect" : ""}`}>
                    {cards.map((project, index) => (
                        <div key={index} className={`flex flex-col justify-center items-center 
                        ${index === 1 ? 'transform md:scale-125 md:w-1/4' : 'md:w-1/4 transform md:scale-90'}`}>
                            <ProjectCardBox project={project} moveEvent={MoveEvent} moveEventReverse={MoveEventReverse} index={index} type="MainPage" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:flex justify-center gap-2 hidden">
                {Array.from({ length: projectCount }).map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`dot ${currentIndex === index ? "selected" : ""} 
                        w-1 h-1 bg-gray-400 rounded-full cursor-pointer 
                        ${currentIndex === index ? "bg-purple-500" : "bg-gray-400"}`}
                    />
                ))}
            </div>

            <div className="project-text mt-8">
                <p className="text-base weight-400 text-gray-400 hover:text-purple-500 transition-colors duration-300 project-link cursor-pointer" onClick={() => window.location.href = "/project"}>
                    더 보러가기 &gt;
                </p>
            </div>
        </div>
    );
};

export default Project;