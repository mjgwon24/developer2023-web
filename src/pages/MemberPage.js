import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import memberData from '../data/member.json';

import { FaGithub, FaLink } from 'react-icons/fa';
// import {}

gsap.registerPlugin(ScrollTrigger);

/**
 * ContactWidget
 * @since 2024.9.12
 * @modified 2024.12.05
 * @author 임석진
 */

const MemberPage = () => {
    const [season, setSeason] = useState('all');
    const [teams, setTeams] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('SEASON');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const pageRef = useRef(null);
    const teamBoxRefs = useRef([]);
    const headerRef = useRef(null);
    const location = useLocation();

    const totalMembers = memberData.season1.reduce((count, team) => count + team.members.length, 0)
        + memberData.season2.reduce((count, team) => count + team.members.length, 0);

    useEffect(() => {
        if (season === 'season1') {
            setTeams(memberData['season1']);
            setSelectedSeason('SEASON 1');
        } else if (season === 'season2') {
            setTeams(memberData['season2']);
            setSelectedSeason('SEASON 2');
        } else {
            setTeams([...memberData['season2'], ...memberData['season1']]);
            setSelectedSeason('SEASON');
        }
    }, [season]);

    const handleSeasonChange = (newSeason) => {
        setSeason(newSeason);
        setIsDropdownOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // GSAP 애니메이션 설정
    useEffect(() => {
        if (!pageRef.current) return;

        // 헤더 애니메이션
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {
                        if(headerRef.current)
                            headerRef.current.style.pointerEvents = "auto"; // 클릭 가능
                    },
                    onLeave: () => {
                        if(headerRef.current)
                            headerRef.current.style.pointerEvents = "none"; // 클릭 방지
                    },
                },
            }
        );

        // 팀 박스 애니메이션
        teamBoxRefs.current.forEach((box, index) => {
            gsap.fromTo(
                box,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });
    }, [teams]);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const targetId = params.get("teamId");
        if(targetId) {
            const targetElement = document.getElementById(targetId);
            if(targetElement){
                const yOffset = -100; // 스크롤 조정값 (예: -100px 위로 조정)
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition + yOffset;

                window.scrollTo({ top: offsetPosition, behavior: "smooth" });

                console.log("scroll success");
            }
            else{
                console.log("scroll fail");
            }
        }
    }, [teams, location.search]);

    return (
        <div className="relative pt-20 pb-40" ref={pageRef}>
            <div className="flex flex-col items-center pb-8 relative z-10" ref={headerRef}>
                <div className="text-center pt-20">
                    <h1 className="text-2xl md:text-3xl weight-600 text-white content-center">MEMBER</h1>
                    <p className="weight-500 text-white text-lg text-gray-300 pt-2">
                        <span className="text-[#FFD873]">총 {totalMembers}명</span>의 팀원들이 디벨로퍼와 함께했어요!
                    </p>
                </div>

                <div className="flex items-center gap-4 pt-10 pb-5">
                    <button
                        className={`px-4 py-2 rounded-lg ${season === 'all' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`}
                        onClick={() => handleSeasonChange('all')}
                    >
                        ALL
                    </button>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center ${season !== 'all' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`}
                            onClick={handleDropdownToggle}
                        >
                            {selectedSeason}
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-[#1E1E1E] rounded-md shadow-lg overflow-hidden text-xs">
                                <button
                                    className={`w-full text-center px-4 py-2 hover:bg-gray-700 ${season === 'season2' ? 'bg-gray-700' : ''} text-white`}
                                    onClick={() => handleSeasonChange('season2')}
                                >
                                    SEASON 2
                                </button>
                                <button
                                    className={`w-full text-center px-4 py-2 hover:bg-gray-700 ${season === 'season1' ? 'bg-gray-700' : ''} text-white`}
                                    onClick={() => handleSeasonChange('season1')}
                                >
                                    SEASON 1
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        className="bg-[#121212] rounded-lg p-6 mb-8"
                        ref={(el) => (teamBoxRefs.current[index] = el)}
                        id={team.teamId}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-white text-xl">
                                {team.teamName} <span className="font-normal text-gray-400 text-sm ml-2">{team.members.length}명</span>
                            </h3>
                            <div className="bg-[#292929] text-gray-300 text-xs px-3 py-1 rounded-lg">
                                {memberData.season1.includes(team) ? 'season1' : 'season2'}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {team.members.map((member, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="flex flex-col items-center justify-center w-[138px] h-[137px] rounded-full bg-[#1E1E1E] shadow-md">
                                        <img className="h-[110px] object-contain"
                                             src={`/images/thumbnails/${member.thumbnail}`}
                                             alt={`${member.memberName} thumbnail`}
                                        />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <span className="text-white font-medium">{member.memberName}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 justify-center mt-1">
                                        {Array.isArray(member.memberRole) ? (
                                            member.memberRole.map((role, idx) => (
                                                <span key={idx} className="bg-[#2A2A2A] text-gray-300 text-xs px-2 py-1 rounded">{role}</span>
                                            ))
                                        ) : (
                                            <span className="bg-[#2A2A2A] text-gray-300 text-xs px-2 py-1 rounded">{member.memberRole}</span>
                                        )}
                                    </div>
                                    <div className="flex gap-3 mt-3">
                                        {member.githubUrl && (
                                            <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                                <FaGithub size={24} />
                                            </a>
                                        )}
                                        {member.otherLink && (
                                            <a href={member.otherLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                                <FaLink size={24} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberPage;
