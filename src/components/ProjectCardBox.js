import React from "react";
import { useNavigate } from "react-router";

const ProjectCardBox = ({ project, type }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/project/detail/${project.projectId}`);
    };

    // Set card box size based on type or default size
    const cardStyle = {
        width: type === "ProjectPage" ? "320px" : "300px", // Larger size when 'ProjectPage'
        height: type === "ProjectPage" ? "430px" : "400px", // 기본 크기: 300px * 400px
        border: "1px solid #d1d1d1",
        borderRadius: "8px",
        background: "white"
    };

    // Always fix image size to 220px
    const imgStyle = {
        height: "50%", // fixed image height
        width: "100%",
        borderTopLeftRadius: type === "ProjectPage" ? "8px" : "6px",
        borderTopRightRadius: type === "ProjectPage" ? "8px" : "6px",
    };

    const seasonbox = {
        width : type === "ProjectPage" ? "60px" : "50px",
        height : type === "ProjectPage" ? "16px" : "14px",
        borderRadius : type === "ProjectPage" ? "7px" : "5px",
        paddingTop: type === "ProjectPage" ? "5px" : "3px",
        fontSize: type === "ProjectPage" ? "15px" : "13px",
    }
    const likepadding = {
        paddingTop : type === "ProjectPage" ? "25px" : "15px"
    }

    return (
        <div className="radius-8 margin-bottom-10" style={cardStyle} onClick={handleCardClick}>
            <img className="width100" style={imgStyle} src={project.imageUrl} alt={project.title} />

            <div className="padding-15 flex-direction-column gap-5p">
                <div className="display-flex justify-between">
                    <h3 className="text-align-start">{project.title}</h3>
                    <span className="season-label" style={seasonbox}>{project.season}</span>
                </div>

                <div className="display-flex-end gap-5p">
                    <p className="weight-400 color-gray">{project.team} |</p>
                    <p className="text-align-start weight-400 color-gray">{project.members}</p>
                </div>

                <p className="text-align-start margin-top-10 weight-400">{project.description}</p>

                <div className="display-flex justify-end gap-5p margin-top-10 weight-400 font-size-14" style = {likepadding}>
                    <p>{project.like} like</p>
                    <p>{project.view} view</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardBox;
