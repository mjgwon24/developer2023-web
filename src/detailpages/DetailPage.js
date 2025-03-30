import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetailPage from "../detailpages/ProjectDetailPage";
import DetailContainer from "../detailpages/DetailContainer";
import ProjectIntroduce from "../detailpages/ProjectIntroduce";
import ProjectReview from "../detailpages/ProjectReview";
import OtherProjects from "./OtherProjects";

/**
 * DetailPage 컴포넌트
 * @author 김진수
 * @since 2024.10.31
 * @lastmodified 2024.11.01
 */

const DetailPage = () => {
    const { projectId } = useParams();
    const projectIdNum = parseInt(projectId);

    return (
        <div className="md:px-0 px-3">
            <DetailContainer>
                <ProjectDetailPage />
                <ProjectIntroduce />
                <ProjectReview projectId={projectIdNum} />
                <OtherProjects />
            </DetailContainer>
        </div>
    );
};

export default DetailPage;
