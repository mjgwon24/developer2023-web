import React from "react";
import { useParams } from "react-router-dom"; // URL에서 파라미터를 가져오기 위한 useParams
import projectsData from "../data/project.json"; // JSON 파일 import

import id1 from "../images/projectDetail/detail_경주의밤.png";
import id2 from "../images/projectDetail/detail_스택네컷.png";
import id3 from "../images/projectDetail/detail_스터디히어로.png";
import id4 from "../images/projectDetail/detail_금장어때.png";

function ProjectIntroduce() {
    const { projectId } = useParams(); // URL에서 projectId를 가져옴
    const numericProjectId = parseInt(projectId, 10); // projectId를 숫자로 변환

    // projectId에 따른 이미지 맵핑
    const imageMap = {
        1: id1,
        2: id2,
        3: id3,
        4: id4
    };

    // projectsData에서 해당 projectId에 맞는 프로젝트 찾기
    const project = projectsData.season2.find((proj) => proj.projectId === numericProjectId);

    if (!project) {
        return <p>프로젝트를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="padding15-0">
            <img
                src={imageMap[numericProjectId] || ""}
                alt={project.title}
                style={{ width: "100%" }}
            />
        </div>
    );
}

export default ProjectIntroduce;
