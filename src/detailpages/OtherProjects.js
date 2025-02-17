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

        allProjects = allProjects.slice(0, 4);

        setProjects(allProjects);
    }, []);

    return (
        <div className="display-flex-column align-items-center width100 padding-bottom-100 gap-3r">
            <div className="display-flex-column align-items-center">
                <p className="see-other-projects">디벨로퍼의 다른 프로젝트도 보고가세요!</p>
            </div>

            <div
                className="other-project-list"
            >
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <ProjectCardBox key={index} project={project} type="DetailPage"/>
                    ))
                ) : (
                    <div className="display-flex justify-center width100 height100" style={{ gridColumn: "1 / -1" }}>
                        <p className="color-light-gray-second align-center">
                            프로젝트가 아직 없어요
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OtherProjects;