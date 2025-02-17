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
        <div className="member-page" ref={pageRef}>
            <div className="display-flex-column align-items-center position-relative z-index-100" ref={headerRef}>
                <div className="text-align-center padding-top-85">
                    <h1 className="weight-700 color-white member-title">MEMBER</h1>
                    <p className="weight-500 color-white padding-top-20 member-discription">
                        <span className="highlight-total">총 {totalMembers}명</span>의 팀원들이 디벨로퍼와 함께했어요!
                    </p>
                </div>

                <div className="filter-container padding-top-50 padding-bottom-20">
                    <button
                        className={`filter-button ${season === 'all' ? 'active' : ''}`}
                        onClick={() => handleSeasonChange('all')}
                    >
                        ALL
                    </button>
                    <div className="dropdown" ref={dropdownRef}>
                        <button
                            className={`dropbtn ${season !== 'all' ? 'active' : ''}`}
                            onClick={handleDropdownToggle}
                        >
                            {selectedSeason}
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown-content is-visible">
                                <button
                                    className={season === 'season2' ? 'selected' : ''}
                                    onClick={() => handleSeasonChange('season2')}
                                >
                                    SEASON 2
                                </button>
                                <button
                                    className={season === 'season1' ? 'selected' : ''}
                                    onClick={() => handleSeasonChange('season1')}
                                >
                                    SEASON 1
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="team-section2">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        className="team-box"
                        ref={(el) => (teamBoxRefs.current[index] = el)}
                        id={team.teamId}
                    >
                        <div className="team-header">
                            <h3 className="weight-600 teamName color-white">
                                {team.teamName} <span
                                className="weight-400 teamMembers color-light-gray-second">{team.members.length}명</span>
                            </h3>
                            <div className="season-badge">
                                {memberData.season1.includes(team) ? 'season1' : 'season2'}
                            </div>
                        </div>
                        <div className="team-members-row">
                            {team.members.map((member, i) => (
                                <div key={i} className="team-member-card display-flex-column align-items-center justify-center">
                                    <div className="display-flex-column width-138 height-137 radius50 bg-gray box-shadow justify-center align-items-center">
                                        <img className="height-110"
                                             src={`/images/thumbnails/${member.thumbnail}`}
                                             alt={`${member.memberName} thumbnail`}
                                        />
                                    </div>
                                    <div className="member-info">
                                        <span className="member-name">{member.memberName}</span>
                                    </div>
                                    <div className="member-roles">
                                    {Array.isArray(member.memberRole) ? (
                                            member.memberRole.map((role, idx) => (
                                                <span key={idx} className="member-role">{role}</span>
                                            ))
                                        ) : (
                                            <span className="member-role">{member.memberRole}</span>
                                        )}
                                    </div>
                                    <div className="member-links">
                                        {member.githubUrl && (
                                            <a href={member.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <FaGithub size={24} />
                                            </a>
                                        )}
                                        {member.otherLink && (
                                            <a href={member.otherLink} target="_blank" rel="noopener noreferrer">
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
