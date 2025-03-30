import React, {useEffect, useState} from "react";
import projectData from "../data/project.json";
import ProjectCardBox from "../components/ProjectCardBox";

const OtherProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        let allProjects = [];

        Object.keys(projectData)
            .sort((a, b) => parseInt(b.replace("season", "")) - parseInt(a.replace("season", "")))
            .forEach((seasonKey) => {
                projectData[seasonKey].forEach((project) => {
                    allProjects.push({ ...project, season: seasonKey });
                });
            });

        allProjects = allProjects.slice(0, 3);

        setProjects(allProjects);
    }, []);

    return (
        <div className="flex flex-col justify-center w-full md:w-[1000px] pb-40">
            <div className="flex flex-col items-center pt-20 pb-12">
                <p className="text-2xl md:text-3xl weight-600 text-white">디벨로퍼의 다른 프로젝트도 보고가세요!</p>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <ProjectCardBox key={index} project={project} type="DetailPage"/>
                    ))
                ) : (
                    <div className="flex justify-center w-full h-full" style={{ gridColumn: "1 / -1" }}>
                        <p className="text-gray-400 text-center">
                            프로젝트가 아직 없어요
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OtherProjects;