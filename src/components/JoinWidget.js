import React, { useRef, useEffect } from 'react';
import kakaoLogo from '../images/backgroundAndPicture/kakao_logo.png';
import paperPlaneImage from '../images/backgroundAndPicture/paper_plane.png';
import chatIconImage from '../images/backgroundAndPicture/chat_icon.png';


/**
 * ContactWidget
 * @since 2024.10.10
 * @modified 2025.03.30
 * @author 임석진
 */

const JoinWidget = ({ onClose }) => {
    const cardRef = useRef(null);

    const currentMonth = new Date().getMonth() + 1;
    const isJoinPeriod = true;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={cardRef} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg z-1000">
            {isJoinPeriod ? (
                <>
                    <div className="flex flex-col items-center gap-4 md:gap-8">
                        <img src={chatIconImage} alt="Chat Icon" className="md:w-16 md:h-16 w-12 h-12"/>

                        <div className="flex flex-col items-center gap-2 md:gap-4">
                            <h2 className="text-2xl weight-600">부원 모집 중 이에요!</h2>
                            <p className="leading-6 text-center">
                                저희는 언제나 여러분을 기다리고 있습니다.<br/>
                                함께 즐거운 개발 여정에 참여하고 싶으시다면,<br/>
                                주저하지 말고 아래 연락처나 카카오 오픈 채팅으로 연락 주세요!
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <div className="text-xl weight-600">
                                <p>010-8271-3102</p>
                            </div>
                            <a
                                href="https://open.kakao.com/o/spbhAOei"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-yellow-300 rounded-lg weight-500"
                            >
                                <img src={kakaoLogo} alt="KakaoTalk" className="w-6 h-6"/>
                                카카오톡으로 문의하기
                            </a>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <img src={paperPlaneImage} alt="Paper Plane" className="w-16 h-16"/>
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-bold">지금은 모집 기간이 아니에요!</h2>
                        <p className="text-lg text-gray-600 leading-6 text-center">
                            모집 기간이 궁금하시다면 문의를 해 주세요.
                        </p>
                    </div>
                </>
            )}
            <button className="absolute top-2 right-2 text-xl" onClick={onClose}>X</button>
        </div>
    );
};

export default JoinWidget;
