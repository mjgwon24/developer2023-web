import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import memberData from "../data/member.json";

gsap.registerPlugin(ScrollTrigger);

/**
 * Team 컴포넌트
 * @since 2024.9.12
 * @lastmodified 2025.03.30
 * @author 임석진, 권민지
 */
const Team = () => {
    const [season, setSeason] = useState("season2");
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const totalMembersRef = useRef(null);
    const seasonRef = useRef(null);
    const linkRefs = useRef([]);
    const [deviceType, setDeviceType] = useState("");

    const totalMembers =
        memberData["season1"].reduce((acc, team) => acc + team.members.length, 0) +
        memberData["season2"].reduce((acc, team) => acc + team.members.length, 0);

    const getDeviceType = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width < height) return "mobile";
        if (width > 768 && width <= 1023) return "tablet";
        return "pc";
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        if (season === "season1") {
            setTeams(memberData["season1"]);
        } else {
            setTeams(memberData["season2"]);
        }

        return () => clearTimeout(timer);
    }, [season]);

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(getDeviceType());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!headerRef.current || !seasonRef.current || !totalMembersRef.current) return;

        const contexts = ScrollTrigger.getAll();
        contexts.forEach(context => context.kill(true));

        const animationConfig = {
            mobile: {
                header: { start: "top 160%" },
                season: { start: "top 160%" },
                totalMembers: { start: "top 160%" },
                link: { start: "top 170%" },
            },
            tablet: {
                header: { start: "top 80%" },
                season: { start: "top 80%" },
                totalMembers: { start: "top 80%" },
                link: { start: "top 85%" },
            },
            pc: {
                header: { start: "top 100%" },
                season: { start: "top 100%" },
                totalMembers: { start: "top 100%" },
                link: { start: "top 100%" },
            },
        };

        const config = animationConfig[deviceType] || animationConfig.pc;

        ScrollTrigger.config({ markers: false });

        gsap.set(headerRef.current, { opacity: 0, y: -50 });
        gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: headerRef.current,
                start: config.header.start,
                toggleActions: "play none none reverse",
            },
        });

        if (seasonRef.current) {
            gsap.set(seasonRef.current, { opacity: 0, y: -50 });
            gsap.to(seasonRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: seasonRef.current,
                    start: config.season.start,
                    toggleActions: "play none none reverse",
                },
            });
        }

        if (totalMembersRef.current) {
            gsap.set(totalMembersRef.current, { opacity: 0, scale: 0.8 });
            gsap.to(totalMembersRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: totalMembersRef.current,
                    start: config.totalMembers.start,
                    toggleActions: "play none none reverse",
                },
            });
        }

        if (linkRefs.current.length > 0) {
            const linkElements = linkRefs.current.filter(el => el !== null);

            linkElements.forEach((el, index) => {
                gsap.set(el, { opacity: 0, x: index % 2 === 0 ? -50 : 50 });
                gsap.to(el, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: el,
                        start: config.link.start,
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [deviceType, teams]);

    const handleSeasonChange = (newSeason) => {
        if (season !== newSeason) {
            setSeason(newSeason);
        }
    };

    return (
        <div className="text-center py-20" ref={sectionRef}>
            <div className="flex flex-col items-center gap-4 mb-12" ref={headerRef}>
                <h2 className="text-2xl md:text-3xl weight-600 text-white content-center">
                    함께 할 수록 즐거운 성장
                </h2>
                <p className="weight-500 text-white text-lg text-gray-300">
                    즐거운 개발 여정을 디벨로퍼와 함께 해 보세요!
                </p>
            </div>

            <div className="flex justify-center space-x-8 mb-12 mt-6" ref={seasonRef}>
                <h2
                    className={`text-xl md:text-2xl weight-600 cursor-pointer transition-colors duration-300 ${season === "season2" ? "text-purple-500" : "text-gray-400 hover:text-white"}`}
                    onClick={() => handleSeasonChange("season2")}
                >
                    SEASON2
                </h2>
                <h2
                    className={`text-xl md:text-2xl weight-600 cursor-pointer transition-colors duration-300 ${season === "season1" ? "text-purple-500" : "text-gray-400 hover:text-white"}`}
                    onClick={() => handleSeasonChange("season1")}
                >
                    SEASON1
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} height={200} className="w-full" baseColor="#2D2D33" highlightColor="#3E3E46" />
                    ))
                ) : (
                    teams.map((team, index) => (
                        <Link
                            to={`/member?teamId=${team.teamId}`}
                            key={index}
                            className="bg-[#1F1F23] p-8 rounded-xl shadow-md transition-all duration-300 flex flex-col items-center border border-gray-800 hover:border-purple-500 group relative overflow-hidden"
                            ref={(el) => (linkRefs.current[index] = el)}
                        >
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            <span className="text-xl md:text-2xl weight-600 text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">{team.teamName}</span>
                            <span className="text-sm weight-500 bg-[#2D2D33] px-4 py-1 rounded-full text-gray-300 group-hover:bg-purple-900 group-hover:text-purple-200 transition-all duration-300">{team.members.length}명</span>
                        </Link>
                    ))
                )}
            </div>

            <div className="mt-16 text-center" ref={totalMembersRef}>
                <p className="text-xl weight-500 text-gray-400">누적 활동 인원</p>
                <h2 className="text-4xl weight-600 text-white pb-5">총 {totalMembers}명</h2>
                <a href="/member" className="text-base weight-500 text-gray-400 hover:text-purple-500 transition-colors duration-300">
                    더 보러가기 &gt;
                </a>
            </div>
        </div>
    );
};

export default Team;