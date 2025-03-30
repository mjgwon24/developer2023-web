import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import projectData from "../data/project.json";
import memberData from "../data/member.json";
import gitIcon from "../images/icon/git_icon.png";


/**
 * 프로젝트 상세 페이지
 * @since 2024.09.22
 * @lastmodified 2025.03.30
 * @author 김진수
 */

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const projectIdNum = parseInt(projectId);
    const [imageLoading, setImageLoading] = useState(true);

    let project = null;
    Object.values(projectData).forEach(seasonProjects => {
        if (!project) {
            project = seasonProjects.find(p => p.projectId === projectIdNum);
        }
    });

    const projectMembers = [];
    Object.values(memberData).forEach(season => {
        season.forEach(team => {
            if (team.projectId === projectIdNum) {
                projectMembers.push(...team.members);
            }
        });
    });

    const handleGitClick = () => {
        if (project && project.gitUrl) {
            window.open(project.gitUrl, "_blank");
        }
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    if (!project) {
        return (
            <MainContainer>
                <p className="text-align-center margin-top-30">해당 프로젝트를 불러올 수 없습니다.</p>
            </MainContainer>
        );
    }

    return (
        <>
            <div className="pb-4 md:py-12 md:w-[1000px]">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        <div className="flex flex-row md:items-end justify-between pb-4 border-b border-gray-700">
                            <h1 className="text-purple-500 text-4xl weight-600 mb-2 md:mb-0">{project.title}</h1>
                            <div className="flex items-center">
                                <button
                                    onClick={handleGitClick}
                                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 shadow-sm transition-all duration-300 py-2 px-4 rounded-lg"
                                >
                                    <img
                                        src={gitIcon}
                                        alt="GitHub"
                                        className="w-5 h-5 opacity-90"
                                    />
                                    <span className="text-gray-100 text-sm font-medium tracking-wide">GitHub</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-start gap-2 mt-2">
                            <p className="text-gray-300 weight-600">{project.team} </p>
                            <p className="text-gray-400">
                                {projectMembers.map((member, index) => (
                                    <span key={member.id}>
                                        {member.memberName}
                                        {index < projectMembers.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-gray-300 weight-600">Stack </p>
                            <p className="text-gray-400">{project.stack}</p>
                        </div>
                    </div>

                    <div className="w-full">
                        <p className="text-[#D6D6D6] whitespace-pre-line">{project.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailPage;
