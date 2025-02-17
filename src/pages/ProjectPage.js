import React, { useState, useEffect, useRef } from "react";
import ProjectCardBox from "../components/ProjectCardBox";
import projectData from "../data/project.json";

import top from "../images/icon/vector_top_black.png";
import bottom from "../images/icon/vector_bottom_black.png";

/**
 * ProjectPage 컴포넌트
 * @author 김진수
 * @since 2024.9.26
 * @lastmodified 2024.01.04
 */

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("기수");
    const [selectedCategory, setSelectedCategory] = useState("분야");
    const [seasons, setSeasons] = useState([]);
    const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [hoveredTeamOption, setHoveredTeamOption] = useState(null);
    const [hoveredCategoryOption, setHoveredCategoryOption] = useState(null);

    const teamDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);

    useEffect(() => {
        let allProjects = [];
        let seasonList = [];

        Object.keys(projectData)
            .sort((a, b) => parseInt(b.replace("season", "")) - parseInt(a.replace("season", "")))
            .forEach((seasonKey) => {
                projectData[seasonKey].forEach((project) => {
                    allProjects.push({ ...project, season: seasonKey });
                });
                seasonList.push(seasonKey.replace("season", "") + "기");
            });

        setProjects(allProjects);
        setFilteredProjects(allProjects);
        setSeasons(seasonList);
    }, []);

    const toggleTeamDropdown = () => {
        setIsTeamDropdownOpen((prev) => !prev);
    };

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen((prev) => !prev);
    };

    const handleOptionClick = (type, value) => {
        if (type === "team") {
            const newTeam = value === "전체" ? "기수" : value;
            setSelectedTeam(newTeam);

            const filteredByTeam = value === "전체"
                ? projects
                : projects.filter((project) => project.season === `season${value.replace("기", "")}`);

            const finalFiltered = selectedCategory === "분야"
                ? filteredByTeam
                : filteredByTeam.filter((project) => project.field === selectedCategory);

            setFilteredProjects(finalFiltered);
        } else if (type === "category") {
            const newCategory = value === "전체" ? "분야" : value;
            setSelectedCategory(newCategory);

            const filteredByCategory = value === "전체"
                ? projects
                : projects.filter((project) => project.field === value);

            const finalFiltered = selectedTeam === "기수"
                ? filteredByCategory
                : filteredByCategory.filter((project) => project.season === `season${selectedTeam.replace("기", "")}`);

            setFilteredProjects(finalFiltered);
        }
    };

    const handleMouseEnter = (type, option) => {
        if (type === "team") {
            setHoveredTeamOption(option);
        } else if (type === "category") {
            setHoveredCategoryOption(option);
        }
    };

    const handleMouseLeave = (type) => {
        if (type === "team") {
            setHoveredTeamOption(null);
        } else if (type === "category") {
            setHoveredCategoryOption(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target)) {
                setIsTeamDropdownOpen(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="project-container">
            <div className="text-align-center padding85-0">
                <h1 className="project-page-title">
                    PROJECT
                </h1>
                <p className="project-page-subtitle">
                    함께이기에 완성할 수 있었던 우리의 결과물들
                </p>
            </div>

            <div className="filter-dropdowns">
                <div
                    className="dropdown-label"
                    style={{
                        marginRight: "5px",
                    }}
                    ref={teamDropdownRef}
                    onClick={toggleTeamDropdown}
                >
                    <div style={{marginLeft: "10px"}}>
                        {selectedTeam}
                    </div>

                    <img src={isTeamDropdownOpen ? top : bottom} alt="dropdown icon" className="DropdownIcon"/>
                    {isTeamDropdownOpen && (
                        <ul className="dropdown-button">
                            {["전체", ...seasons].map((team, index, categories) => (
                                <li
                                    className={`dropdown-toggle ${
                                        index === 0 ? "radius-top" : index === categories.length - 1 ? "radius-bottom" : ""
                                    }`}
                                    key={index}
                                    onClick={() => handleOptionClick("team", team)}
                                    onMouseEnter={() => handleMouseEnter("team", team)}
                                    onMouseLeave={() => handleMouseLeave("team")}
                                    style={{
                                        color: hoveredTeamOption === team ? "#B751F2" : "#FFFFFF",
                                    }}
                                >
                                    {team}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div
                    className="dropdown-label"
                    style={{
                        marginRight: "0px",
                    }}
                    ref={categoryDropdownRef}
                    onClick={toggleCategoryDropdown}
                >
                    <div style={{marginLeft: "10px"}}>
                        {selectedCategory}
                    </div>
                    <img src={isCategoryDropdownOpen ? top : bottom} alt="dropdown icon"/>
                    {isCategoryDropdownOpen && (
                        <ul className="dropdown-button">
                            {["전체", "웹", "앱"].map((category, index, categories) => (
                                <li
                                    className={`dropdown-toggle ${
                                        index === 0 ? "radius-top" : index === categories.length - 1 ? "radius-bottom" : ""
                                    }`}
                                    key={index}
                                    onClick={() => handleOptionClick("category", category)}
                                    onMouseEnter={() => handleMouseEnter("category", category)}
                                    onMouseLeave={() => handleMouseLeave("category")}
                                    style={{
                                        color: hoveredCategoryOption === category ? "#B751F2" : "#FFFFFF",
                                    }}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div
                className="project-list"
            >
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <ProjectCardBox key={index} project={project} type="ProjectPage"/>
                    ))
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%", // 프로젝트 리스트 영역을 꽉 채우도록
                            gridColumn: "1 / -1", // 모든 열을 차지하도록 설정
                        }}
                    >
                        <p
                            className="color-light-gray-second"
                            style={{
                                textAlign: "center", // 텍스트 중앙 정렬
                            }}
                        >
                            프로젝트가 아직 없어요
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
