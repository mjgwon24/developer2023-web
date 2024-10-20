import React, { useEffect, useState } from "react";
import ProjectCardBox from "./ProjectCardBox";
import projectsData from '../data/project.json'; // 프로젝트 데이터를 가져옴

const Project = () => {
    const [projects, setProjects] = useState([]); // 모든 프로젝트 데이터를 저장
    const [currentIndex, setCurrentIndex] = useState(1); // 중앙에 있는 카드가 슬라이더 시작 위치로 오도록 1로 설정
    const [isTransitioning, setIsTransitioning] = useState(false); // 슬라이드 애니메이션 중인지 체크

    useEffect(() => {
        let filteredProjects = [];
        Object.keys(projectsData).forEach(seasonKey => {
            projectsData[seasonKey].forEach(project => {
                if (project.aword) {
                    filteredProjects.push({ ...project, season: seasonKey });
                }
            });
        });
        filteredProjects.reverse();
        // 맨 앞에 마지막 카드(6) 복사, 맨 뒤에 첫 번째 카드(1) 복사하여 무한 슬라이더 구현
        setProjects([
            filteredProjects[filteredProjects.length - 1], // 인덱스 0에 마지막 카드 복제
            ...filteredProjects, // 실제 카드들 (1~5)
            filteredProjects[0] // 인덱스 6에 첫 번째 카드 복제
        ]);
    }, []);

    const visibleSlides = 3; // 한 번에 보이는 카드 개수

    const goToNextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const goToPrevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        // 복제된 첫 번째 또는 마지막 카드로 이동 시
        if (currentIndex === projects.length - 1) {
            setCurrentIndex(1); // 마지막 복제 카드에서 실제 첫 번째 카드로 이동
        } else if (currentIndex === 0) {
            setCurrentIndex(projects.length - 2); // 첫 번째 복제 카드에서 실제 마지막 카드로 이동
        }
    };

    const goToProjectPage = () => {
        window.location.href = "http://localhost:3000/project"; // URL을 직접 변경하여 이동
    };

    return (
        <div className="text-align-center padding85-0">
            {/* 제목과 설명 */}
            <div className="display-flex flex-direction-column gap-1r margin-bottom-60">
                <h2 className="font-size-36 weight-700" style={{color : "#FFFFFF"}}>달려온 결과</h2>
                <p className="font-size-20 weight-400" style={{color : "#FFFFFF"}}>저희가 만든 프로젝트, 궁금하신가요?</p>
            </div>

            {/* 슬라이더 */}
            <div className="overflow-hidden position-relative" style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
                    <div
                    className="display-flex"
                    style={{
                        display: 'flex',
                        justifyContent: 'start',  // 슬라이드를 왼쪽 정렬
                        gap: '20px',
                        transform: `translateX(-${(currentIndex - 1) * (300 + 20)}px)`, // currentIndex를 기준으로 x-1, x, x+1을 표시
                        transition: isTransitioning ? "transform 0.8s ease" : "none", // 부드러운 슬라이드 애니메이션
                    }}
                    onTransitionEnd={handleTransitionEnd} // 슬라이드가 끝날 때 호출
                >
                    {/* 슬라이드에서 전체 프로젝트를 렌더링 */}
                    {projects.map((project, index) => {
                        const isCenter = index === currentIndex; // currentIndex가 중앙 카드임
                        const scale = isCenter ? 1 : 0.8; // 중앙에 있는 카드만 크게, 나머지는 작게
                        const opacity = isCenter ? 1 : 0.7; // 중앙 카드만 불투명하게

                        return (
                            <div
                                key={index}
                                style={{
                                    flexShrink: 0,
                                    transform: `scale(${scale})`,
                                    opacity: `${opacity}`,
                                    transition: 'transform 0.5s ease, opacity 0.5s ease'
                                }}
                            >
                                <ProjectCardBox project={project} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 좌우 클릭 점과 중앙 강조 점 */}
            <div className="display-flex justify-center" style={{ position: 'relative', gap: '10px', marginTop: '20px' }}>
                {/* 왼쪽 클릭 점 */}
                <div
                    onClick={goToPrevSlide}
                    style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                    }}
                />

                {/* 중앙 강조 점 */}
                <div
                    style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF', // 중앙 점은 항상 검정색으로 강조
                        cursor: 'default',
                    }}
                />

                {/* 오른쪽 클릭 점 */}
                <div
                    onClick={goToNextSlide}
                    style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                    }}
                />
            </div>

            {/* 더 보러가기 버튼 */}
            <div style={{ marginTop: '20px', cursor: 'pointer', color : "#FFFFFF" }}>
                <p className="font-size-16 weight-400 color-gray" onClick={goToProjectPage}>
                    더 보러가기 &gt;
                </p>
            </div>
        </div>
    );
};

export default Project;
