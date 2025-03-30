import React, { useState } from "react";
import { useNavigate } from "react-router";

const ProjectCardBox = ({ project, type, moveEvent, moveEventReverse, index }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleCardClick = () => {
        navigate(`/project/detail/${project.projectId}`);
    };

    return (
        <div
            className={`rounded-lg overflow-hidden shadow-md transition-all duration-300
${type}-project-card ${index !== undefined ? `box${index}` : ""}
${moveEvent ? `effect${index}` : ""} ${moveEventReverse ? `effectReverse${index}` : ""}
cursor-pointer ${isHovered ? 'transform scale-105' : ''} bg-white dark:bg-gray-50/5`}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col h-full">
                <div className="relative overflow-hidden h-[170px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                    <img
                        className={`w-full h-full object-cover ${type}-project-card-image hover:scale-110 transition-transform duration-500`}
                        src={project.imageUrl}
                        alt={project.title}
                    />
                    <div className="absolute top-0 right-0 bg-purple-700 text-white px-2 py-0.5 text-xs m-2 rounded shadow-sm bg-opacity-70 weight-400 z-20">
                        {project.season}
                    </div>
                </div>
                <div className={`flex flex-col items-start flex-grow ${type}-cardBackground p-4 pb-7`}>
                    <h2 className={`${type}-project-card-title weight-600 text-gray-800 dark:text-gray-100 truncate text-base mb-0.5`}>
                        {project.title}
                    </h2>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span className="weight-400">{project.team}</span>
                        <span className="mx-1.5 text-gray-300 dark:text-gray-600">|</span>
                        <span className="truncate text-gray-400 dark:text-gray-500">{project.members}</span>
                    </div>
                    <p className={`text-gray-600 dark:text-gray-300 text-xs line-clamp-3 ${type}-project-card-description`}>
                        {project.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardBox;