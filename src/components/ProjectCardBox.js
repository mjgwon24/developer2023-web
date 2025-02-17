import React, { useState } from "react";
import { useNavigate } from "react-router";


/**
 * 프로젝트 상세 페이지
 * @since 2024.09.22
 * @lastmodified 2024.11.09
 */

const ProjectCardBox = ({ project, type, moveEvent,moveEventReverse,index }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); // 마우스 오버 상태 추가

    const handleCardClick = () => {
        navigate(`/project/detail/${project.projectId}`);
    };


    return (
        <div
            className={`radius-8 ${type}-project-card ${index!=undefined?`box${index}`:""} ${moveEvent?`effect${index}`:""} ${moveEventReverse?`effectReverse${index}`:""}`}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)} // 마우스 오버 시 상태 변경
            onMouseLeave={() => setIsHovered(false)} // 마우스 아웃 시 상태 변경
        >
            <div className="flex flex-col gap-0" style={{display:"flex",flexDirection:"column"}}>
                <img className={`width100 ${type}-project-card-image`} src={project.imageUrl} alt={project.title}/>
                <div className={`flex-direction-column gap-5p ${type}-cardBackground`}>
                    <div className="display-flex justify-between padding-bottom-2">
                        <h3 className={`${type}-project-card-title`}>{project.title}</h3>
                        <span className={`season-label ${type}-project-card-season`}>{project.season}</span>
                    </div>

                    <div className={`display-flex-end gap-5p ${type}-project-card-team`}>
                        <p className="weight-400 color-gray">{project.team} |</p>
                        <p className="text-align-start weight-400 color-gray">{project.members}</p>
                    </div>

                    <p className={`text-align-start margin-top-10 weight-400 ${type}-project-card-description`}>{project.description}{project.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardBox;
