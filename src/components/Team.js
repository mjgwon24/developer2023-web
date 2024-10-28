import React, { useEffect, useState } from "react";
import memberData from '../data/member.json'; // JSON 데이터 가져오기
import '../css/style.css';
import '../css/practice.css';
import '../css/team.css';

const MemberPage = () => {
    const [season, setSeason] = useState('season2'); // 기본 시즌은 'season2'
    const [teams, setTeams] = useState([]);

    // memberData에서 시즌1과 시즌2의 전체 팀원 수 계산
    const totalMembers = memberData['season1'].reduce((acc, team) => acc + team.members.length, 0) +
        memberData['season2'].reduce((acc, team) => acc + team.members.length, 0);

    useEffect(() => {
        // 시즌에 따라 팀 설정
        if (season === 'season1') {
            setTeams(memberData['season1']);
        } else {
            setTeams(memberData['season2']);
        }
    }, [season]);

    const handleSeasonChange = (newSeason) => {
        setSeason(newSeason);
    };

    return (
        <div className="text-align-center padding85-0">
            {/* 페이지 타이틀 */}
            <div className="display-flex flex-direction-column gap-1r margin-bottom-60">
                <h2 className="font-size-36 weight-700">함께 할수록 즐거운 성장</h2>
                <p className="font-size-20 weight-400">즐거운 개발 여정을 디벨로퍼와 함께 해 보세요!</p>
            </div>

            {/* 시즌 선택 버튼 */}
            <div className="season-selector">
                <h2
                    className={`season ${season === 'season2' ? 'active' : ''}`}
                    onClick={() => handleSeasonChange('season2')}
                >
                    SEASON2
                </h2>
                <h2
                    className={`season ${season === 'season1' ? 'active' : ''}`}
                    onClick={() => handleSeasonChange('season1')}
                >
                    SEASON1
                </h2>
            </div>

            {/* 팀 카드 섹션 */}
            <div className="team-section3">
                {teams.map((team, index) => (
                    <div key={index} className="team-card">
                        <span className="team-name">{team.teamName}</span><br />
                        <span className="team-members">{team.members.length}명</span>
                    </div>
                ))}
            </div>



            {/* 누적 활동 인원 */}
            <div className="total-members-section text-align-center margin-top-40">
                <p className="font-size-24 weight-300">누적 활동 인원</p>
                {/* member.json에서 계산한 총 멤버 수 표시 */}
                <h2 className="font-size-48 weight-600">총 {totalMembers}명</h2>
                <a href="/member" className="font-size-16 weight-500">더 보러가기 ></a>
            </div>
        </div>
    );
};

export default MemberPage;
