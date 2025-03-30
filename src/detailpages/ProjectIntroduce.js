'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import projectsData from "../data/project.json";

import id1 from "../images/projectDetail/detail_경주의밤.png";
import id2 from "../images/projectDetail/detail_스택네컷.png";
import id3 from "../images/projectDetail/detail_스터디히어로.png";
import id4 from "../images/projectDetail/detail_금장어때.png";

function ProjectIntroduce() {
    const { projectId } = useParams();
    const numericProjectId = parseInt(projectId, 10);
    const [imageLoading, setImageLoading] = useState(true);
    const [skeletonVisible, setSkeletonVisible] = useState(true);

    const imageMap = {
        1: id1,
        2: id2,
        3: id3,
        4: id4
    };

    const project = projectsData.season2.find((proj) => proj.projectId === numericProjectId);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSkeletonVisible(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    if (!project) {
        return <p>프로젝트를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="py-15 container mx-auto max-w-7xl">
            {(imageLoading || skeletonVisible) && (
                <div className="w-full aspect-video bg-gray-700/50 animate-pulse rounded-lg shadow-lg flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={imageMap[numericProjectId] || ""}
                alt={project.title}
                className={`w-full rounded-lg shadow-lg ${(imageLoading || skeletonVisible) ? 'hidden' : 'block'}`}
                onLoad={handleImageLoad}
            />
        </div>
    );
}

export default ProjectIntroduce;