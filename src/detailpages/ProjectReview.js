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
        return <p className="text-gray-400">아직 후기가 없어요</p>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="text-center pt-20 pb-8">
                <h2 className="text-2xl md:text-3xl weight-600 text-white">프로젝트 후기</h2>
            </div>
            <div className="pb-16 space-y-6">
                {reviews.map((reviewer, index) => (
                    <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex-shrink-0 relative flex items-start justify-center">
                            <img
                                src={`/images/thumbnails/${reviewer.thumbnail}`}
                                alt={`${reviewer.memberName} 사진`}
                                className="h-16 w-16 rounded-full border border-gray-400/70 object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg weight-500 text-white mb-2">
                                {reviewer.memberName}{" "}
                                <span className="pl-2 text-sm font-normal text-purple-300">
                                {Array.isArray(reviewer.memberRole) ? reviewer.memberRole.join(', ') : reviewer.memberRole}
                            </span>
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
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
