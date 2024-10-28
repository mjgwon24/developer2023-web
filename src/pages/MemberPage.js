import React, { useEffect, useState } from "react";
import memberData from '../data/member.json'; // JSON 데이터 가져오기
import '../css/style.css';
import '../css/practice.css';
import '../css/memberpage.css'; // 필요에 따라 CSS 파일 추가
import { FaGithub, FaLink } from 'react-icons/fa'; // react-icons에서 GitHub와 링크 아이콘 임포트

/**
 * ContactWidget
 * @since 2024.9.12
 * 임석진
 */

const MemberPage = () => {
    const [season, setSeason] = useState('all'); // 기본 시즌은 'all'
    const [teams, setTeams] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('SEASON ▾'); // 드롭다운 버튼의 초기 텍스트

    useEffect(() => {
        // 시즌에 따라 팀 데이터 설정
        if (season === 'season1') {
            setTeams(memberData['season1']);
            setSelectedSeason('SEASON 1'); // 선택된 시즌 텍스트 설정
        } else if (season === 'season2') {
            setTeams(memberData['season2']);
            setSelectedSeason('SEASON 2'); // 선택된 시즌 텍스트 설정
        } else {
            // all일 때는 season2를 먼저, season1을 나중에 합쳐서 설정
            setTeams([...memberData['season2'], ...memberData['season1']]);
            setSelectedSeason('SEASON'); // 선택된 시즌 텍스트 설정
        }
    }, [season]);

    // 시즌 변경 핸들러
    const handleSeasonChange = (newSeason) => {
        setSeason(newSeason);
    };

    return (
        <div className="member-page">
            {/* 페이지 타이틀 */}
            <div className="text-align-center padding85-0">
                <h1 className="font-size-36 weight-700">MEMBER</h1>
                <p className="font-size-20 title-description-spacing">총 41명의 팀원들이 디벨로퍼와 함께했어요!</p>
            </div>

            <div className="filter-container">
                <button
                    className={`filter-button ${season === 'all' ? 'active' : ''}`}
                    onClick={() => handleSeasonChange('all')}
                >
                    ALL
                </button>
                <div className="dropdown">
                    <button className={`dropbtn ${season !== 'all' ? 'active' : ''}`}>
                        {selectedSeason}
                    </button>
                    <div className="dropdown-content">
                        <button
                            className={season === 'season1' ? 'selected' : ''}
                            onClick={() => handleSeasonChange('season1')}
                        >
                            SEASON 1
                        </button>
                        <button
                            className={season === 'season2' ? 'selected' : ''}
                            onClick={() => handleSeasonChange('season2')}
                        >
                            SEASON 2
                        </button>
                    </div>
                </div>
            </div>

            {/* TEAM SECTION */}
            <div className="team-section2">
                {teams.map((team, index) => (
                    <div key={index} className="team-box">
                        <div className="team-header">
                            <h3 className="team-name">{team.teamName} <span>{team.members.length}명</span></h3>
                            <span className="season-badge">
                                {memberData.season1.includes(team) ? 'season1' : 'season2'}
                            </span>
                        </div>

                        {/* 팀 멤버들을 3명씩 나누어 그룹화하고 각 그룹을 줄로 렌더링 */}
                        <div className="team-members-row">
                            {team.members.map((member, i) => (
                                <div key={i} className="team-member-card">
                                    <div className="member-image"/>
                                    {/* 원형 이미지 */}
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
                                                <FaGithub size={24}/> {/* GitHub 아이콘 */}
                                            </a>
                                        )}
                                        {member.otherLink && (
                                            <a href={member.otherLink} target="_blank" rel="noopener noreferrer">
                                                <FaLink size={24}/> {/* Other 링크 아이콘 */}
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

