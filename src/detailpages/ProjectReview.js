import React from 'react';
import memberData from '../data/member.json';

/**
 * ProjectReview 컴포넌트
 * @author 김진수
 * @since 2024.10.31
 * @lastmodified 2024.11.01
 */

const ProjectReview = ({ projectId }) => {
    const reviews = memberData.season1
        .concat(memberData.season2)
        .find(team => team.projectId === projectId)
        ?.members.filter(member => member.review);

    if (!reviews || reviews.length === 0) {
        return <p className="color-light-gray">아직 후기가 없어요</p>;
    }

    return (
        <div className="detail-container">
            <div className="text-align-center padding85-0">
                <h2 className="project-review-title weight-700" style={{ color: "#FFFFFF" }}>프로젝트 후기</h2>
            </div>
            <div style={{ paddingBottom: '85px' }}>
                {reviews.map((reviewer, index) => (
                    <div key={index} className="review-card representative-color">
                        <div className="reviewer-avatar">
                            <img
                                src={`/images/thumbnails/${reviewer.thumbnail}`}
                                alt={`${reviewer.memberName} 사진`}
                                className="review-img"
                            />

                        </div>
                        <div className="review-content">
                            <h3 className="reviewer-name">
                            {reviewer.memberName}{" "}
                                <span className="reviewer-stack">
                                    {Array.isArray(reviewer.memberRole) ? reviewer.memberRole.join(', ') : reviewer.memberRole}
                                </span>
                            </h3>
                            <p className="review-text">
                                {reviewer.review.split('\n').map((line, idx) => (
                                    <React.Fragment key={idx}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectReview;
