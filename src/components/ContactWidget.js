import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
            {/*<div className="ContactWidgetButton" onClick={toggleCardVisibility}>*/}
            {/*    <FontAwesomeIcon icon={faEnvelope} className="ContactMailIcon" />*/}
            {/*</div>*/}

            {/*{isCardVisible && (*/}
            {/*    <div ref={cardRef} className="ContactCardContainer">*/}
            {/*        <h2 className="ContactHeader">문의하기</h2>*/}
            {/*        <p className="ContactDescription">문의사항이 있으실 경우 아래로 연락 주세요!</p>*/}
            {/*        <div className="ContactContactBox">*/}
            {/*            <FontAwesomeIcon icon={faPhoneAlt} className="ContactConstactIcon" />*/}
            {/*            <span className="ContactContactText">010-5109-0625</span>*/}
            {/*        </div>*/}
            {/*        <a*/}
            {/*            href="https://open.kakao.com/o/spWt0I8g"*/}
            {/*            target="_blank"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*            className='ContactKakaoButton'*/}
            {/*        >*/}
            {/*            <img src={kakaoLogo} alt="KakaoTalk" className="ContactKakaoIcon" />*/}
            {/*            카카오톡으로 문의하기*/}
            {/*        </a>*/}
            {/*        <button className="ContactCloseButton" onClick={toggleCardVisibility}>X</button>*/}
            {/*    </div>*/}
            {/*)}*/}
        </>
    );
};

export default ContactWidget;
