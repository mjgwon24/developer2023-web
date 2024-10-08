import React, { useState, useEffect } from "react";
import ProjectCardBox from "../components/ProjectCardBox";
import projectData from "../data/project.json"; // project.json 파일에서 데이터 가져오기
import '../css/style.css';  // CSS 파일을 불러옴
import '../css/practice.css'; // 프로젝트 전용 CSS
import '../css/team.css';  // 팀 관련 CSS
import top from "../images/icon/vector_top_black.png";
import bottom from "../images/icon/vector_bottom_black.png";

const ProjectPage = () => {
    const [projects, setProjects] = useState([]); // 모든 프로젝트 데이터를 저장
    const [filteredProjects, setFilteredProjects] = useState([]); // 필터링된 프로젝트 데이터를 저장
    const [selectedTeam, setSelectedTeam] = useState(""); // 선택된 기수
    const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 분야

    const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false); // 팀 드롭다운 상태
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // 카테고리 드롭다운 상태

    // 컴포넌트가 마운트될 때 project.json 데이터를 가져옴
    useEffect(() => {
        // 시즌별 데이터를 배열로 합쳐서 큰 시즌부터 정렬
        const allProjects = Object.keys(projectData)
            .sort((a, b) => parseInt(b.replace('season', '')) - parseInt(a.replace('season', ''))) // 시즌 이름에서 숫자만 추출하여 정렬
            .reduce((acc, season) => acc.concat(projectData[season]), []); // 시즌 순서대로 배열 병합
        setProjects(allProjects); // 정렬된 프로젝트 데이터를 state에 저장
        setFilteredProjects(allProjects); // 초기 상태에서는 모든 시즌을 보여줌
    }, []);

    // 선택된 팀과 분야에 따라 프로젝트 필터링
    useEffect(() => {
        let filtered = projects;

        // 기수 선택에 따른 필터링
        if (selectedTeam !== "") {
            filtered = Object.keys(projectData)
                .filter(season => selectedTeam === "전체" || season === `season${selectedTeam.replace('기', '')}`) // "1기" -> "season1"으로 매칭
                .sort((a, b) => parseInt(b.replace('season', '')) - parseInt(a.replace('season', ''))) // 시즌 정렬
                .reduce((acc, season) => acc.concat(projectData[season]), []); // 시즌별 데이터 합치기
        }

        // 분야 선택에 따른 필터링
        if (selectedCategory !== "") {
            filtered = filtered.filter(project => project.field === selectedCategory);
        }

        setFilteredProjects(filtered);
    }, [selectedTeam, selectedCategory, projects]);

    // 기수 변경 핸들러
    const handleTeamChange = (e) => {
        const value = e.target.value;
        setSelectedTeam(value === "전체" ? "" : value);
        setIsTeamDropdownOpen(false); // 드롭다운 닫힘
    };

    // 분야 변경 핸들러
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value === "전체" ? "" : value);
        setIsCategoryDropdownOpen(false); // 드롭다운 닫힘
    };

    return (
        <div className="main-container">
            {/* 페이지 제목 */}
            <h1 className="title">PROJECT</h1>
            <p className="subtitle">함께이기에 완성할 수 있었던 우리의 결과물들</p>

            {/* 필터링 드롭다운 */}
            <div className="filter-dropdowns" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                {/* 기수 선택 드롭다운 */}
                <label className="dropdown-label" style={{ marginRight: '10px', position: 'relative' }}>
                    <select
                        value={selectedTeam}
                        onChange={handleTeamChange}
                        onClick={() => setIsTeamDropdownOpen(prev => !prev)}
                        style={{ paddingRight: '25px'}} // Add padding for the icon
                    >
                        <option value="" disabled hidden>기수</option>
                        <option value="전체">전체</option>
                        <option value="1기">1기</option>
                        <option value="2기">2기</option>
                        <option value="3기">3기</option>
                    </select>
                    <img
                        src={isTeamDropdownOpen ? top : bottom}
                        alt="dropdown icon"
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                    />
                </label>

                {/* 분야 선택 드롭다운 */}
                <label className="dropdown-label" style={{ position: 'relative' }}>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        onClick={() => setIsCategoryDropdownOpen(prev => !prev)}
                        style={{ paddingRight: '25px' }} // Add padding for the icon
                    >
                        <option value="" disabled hidden>분야</option>
                        <option value="전체">전체</option>
                        <option value="웹">웹</option>
                        <option value="앱">앱</option>
                    </select>
                    <img
                        src={isCategoryDropdownOpen ? top : bottom}
                        alt="dropfown icon"
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                    />
                </label>
            </div>

            {/* 프로젝트 카드 목록 */}
            <div className="project-list" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                justifyItems: 'center'
            }}>
                {filteredProjects.map((project, index) => (
                    <ProjectCardBox key={index} project={project} type="ProjectPage" />
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
