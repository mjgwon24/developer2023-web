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
        <div className="container mx-auto md:w-[1000px] min-h-screen px-4 pt-20 pb-40">
            <div className="text-center pt-20 pb-8">
                <h1 className="text-center text-2xl md:text-3xl weight-600 text-white md:mb-2 mb-1">
                    PROJECT
                </h1>
                <p className="weight-500 text-white text-lg text-gray-300">
                    함께이기에 완성할 수 있었던 우리의 결과물들
                </p>
            </div>

            <div className="flex justify-end space-x-4 mb-8">
                <div
                    className="relative border border-gray-700 rounded-lg px-4 py-2.5 cursor-pointer w-36 transition-all duration-300 hover:border-purple-500/30"
                    ref={teamDropdownRef}
                    onClick={toggleTeamDropdown}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-gray-200 text-sm font-medium">{selectedTeam}</span>
                        <img
                            src={isTeamDropdownOpen ? top : bottom}
                            alt="dropdown icon"
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${isTeamDropdownOpen ? 'opacity-80' : 'opacity-60'}`}
                        />
                    </div>
                    {isTeamDropdownOpen && (
                        <ul className="absolute left-0 right-0 mt-2.5 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
                            {["전체", ...seasons].map((team, index, categories) => (
                                <li
                                    className="px-4 py-2.5 transition-colors duration-200 text-sm border-b border-gray-800/50 last:border-none"
                                    key={index}
                                    onClick={() => handleOptionClick("team", team)}
                                    onMouseEnter={() => handleMouseEnter("team", team)}
                                    onMouseLeave={() => handleMouseLeave("team")}
                                    style={{
                                        color: hoveredTeamOption === team ? "#d4a7ff" : "#e2e2e2",
                                        background: hoveredTeamOption === team ? "rgba(138, 43, 226, 0.08)" : "transparent"
                                    }}
                                >
                                    {team}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div
                    className="relative border border-gray-700 rounded-lg px-4 py-2.5 cursor-pointer w-36 transition-all duration-300 hover:border-purple-500/30"
                    ref={categoryDropdownRef}
                    onClick={toggleCategoryDropdown}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-gray-200 text-sm font-medium">{selectedCategory}</span>
                        <img
                            src={isCategoryDropdownOpen ? top : bottom}
                            alt="dropdown icon"
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${isCategoryDropdownOpen ? 'opacity-80' : 'opacity-60'}`}
                        />
                    </div>
                    {isCategoryDropdownOpen && (
                        <ul className="absolute left-0 right-0 mt-2.5 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
                            {["전체", "웹", "앱"].map((category, index) => (
                                <li
                                    className="px-4 py-2.5 transition-colors duration-200 text-sm border-b border-gray-800/50 last:border-none"
                                    key={index}
                                    onClick={() => handleOptionClick("category", category)}
                                    onMouseEnter={() => handleMouseEnter("category", category)}
                                    onMouseLeave={() => handleMouseLeave("category")}
                                    style={{
                                        color: hoveredCategoryOption === category ? "#d4a7ff" : "#e2e2e2",
                                        background: hoveredCategoryOption === category ? "rgba(138, 43, 226, 0.08)" : "transparent"
                                    }}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <div key={index} className="flex justify-center">
                            <div className="w-full max-w-xs">
                                <ProjectCardBox project={project} type="ProjectPage"/>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex justify-center items-center h-64">
                        <p className="text-gray-400 text-center">
                            프로젝트가 아직 없어요
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
