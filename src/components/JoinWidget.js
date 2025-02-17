import React, { useRef, useEffect } from 'react';
import kakaoLogo from '../images/backgroundAndPicture/kakao_logo.png';
import paperPlaneImage from '../images/backgroundAndPicture/paper_plane.png';
import chatIconImage from '../images/backgroundAndPicture/chat_icon.png';


/**
 * ContactWidget
 * @since 2024.10.10
 * @modified 2024.11.26
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
        <div ref={cardRef} className="card-container">
            {isJoinPeriod ? (
                <>
                    <div className="display-flex-column align-items-center gap-2r">
                        <img src={chatIconImage} alt="Chat Icon" className="on-collecting-chat-icon"/>

                        <div className="display-flex-column align-items-center gap-1r">
                            <h2 className="on-collecting-title">부원 모집 중 이에요!</h2>
                            <p className="line-height-1d5 on-collecting-subtitle">
                                저희는 언제나 여러분을 기다리고 있습니다.<br/>
                                함께 즐거운 개발 여정에 참여하고 싶으시다면,<br/>
                                주저하지 말고 아래 연락처나 카카오 오픈 채팅으로 연락 주세요!
                            </p>
                        </div>

                        <div className="display-flex-column align-items-center gap-1d5r">
                            <div className="on-collecting-phonenumber">
                                <p>010-5109-0625</p>
                            </div>
                            <a
                                href="https://open.kakao.com/o/spWt0I8g"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="kakao-button"
                            >
                                <img src={kakaoLogo} alt="KakaoTalk" className="kakao-icon on-collecting-kakao-icon"/>
                                카카오톡으로 문의하기
                            </a>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <img src={paperPlaneImage} alt="Paper Plane" className="icon-image"/>
                    <div className="display-flex-column align-items-center gap-1r">
                        <h2 className="weight-700 font-size-28">지금은 모집 기간이 아니에요!</h2>
                        <p className="color-deep-gray font-size-18 line-height-1d5">
                            모집 기간이 궁금하시다면 문의를 해 주세요.
                        </p>
                    </div>
                </>
            )}
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    );
};

export default JoinWidget;
