import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons';
import kakaoLogo from '../images/backgroundAndPicture/kakao_logo.png';

const ContactWidget = () => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const cardRef = useRef(null);

    const toggleCardVisibility = () => {
        setIsCardVisible(!isCardVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsCardVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="fixed bottom-5 right-5 p-4 bg-purple-700 rounded-full flex justify-center items-center cursor-pointer shadow-lg z-50"
                 onClick={toggleCardVisibility}>
                <FontAwesomeIcon icon={faEnvelope} className="text-white" />
            </div>

            {isCardVisible && (
                <div ref={cardRef} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex flex-row justify-between mb-2 md:mb-4">
                            <h2 className="text-xl md:text-2xl weight-700 text-center">문의하기</h2>
                            <button className="flex items-center justify-center h-full"
                                    onClick={toggleCardVisibility}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        <p className="mb-4">문의사항이 있으실 경우 아래로 연락 주세요!</p>
                        <div className="flex items-center mb-4 bg-purple-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-purple-200">
                            <FontAwesomeIcon icon={faPhoneAlt} className="text-purple-700 mr-3 text-lg" />
                            <span className="text-gray-700 font-medium">010-8271-3102</span>
                        </div>
                        <a
                            href="https://open.kakao.com/o/spbhAOei"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer flex items-center justify-center px-4 py-3 bg-yellow-300 hover:bg-yellow-400 rounded-lg mb-4 shadow-md transition-all duration-300 border border-yellow-400 group"
                        >
                            <div className="flex gap-2 items-center">
                                <img src={kakaoLogo} alt="KakaoTalk" className="w-5 h-5" />
                                <span className="text-gray-800 weight-500">카카오톡으로 문의하기</span>
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactWidget;
